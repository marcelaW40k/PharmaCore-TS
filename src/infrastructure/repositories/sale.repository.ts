import { Sale } from "../../domain/models/sale";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { SaleItemRepository } from "./saleItem.repository";



export class SaleRepository implements Imanageable<Sale> {

    async patientExists(id_patient: string): Promise<boolean> {
        const connection = getPoolConnection();
        try {
            const query = `SELECT EXISTS(SELECT 1 FROM patients WHERE id_patient = ?) AS patient_exists`;
            const [resultExists] = await connection.query<RowDataPacket[]>(query, [id_patient]);
            return resultExists[0].patient_exists === 1
        } catch (error) {
            console.error("Error verificando la existencia del paciente:", error);
            return false;
        }
    }

    async create(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();


        const salequerySql: string = 'INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?, NULL)';
        const salevalues: Array<string | Date> =
            [body.id_patient,
            body.date_time];
        ;
        const saleresult: [ResultSetHeader, FieldPacket[]] = await connection.query(salequerySql, salevalues);
        body.id_sale = saleresult[0].insertId;

        const saleItemRepository = new SaleItemRepository()
        for (const item of body.items) {
            item.id_sale = body.id_sale;
            await saleItemRepository.create(item)
        }

        const totalCostQuery = `UPDATE  sales SET sale_total_cost = (SELECT SUM(total_cost_item) FROM sale_items WHERE id_sale = ?) WHERE id_sale = ?`;
        await connection.query(totalCostQuery, [body.id_sale, body.id_sale]);
        return saleresult[0].affectedRows == 1 ? body : null;
    }

    async read(): Promise<Sale[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sales`;
        const result = await connection.query(querySql);
        return result[0] as Sale[]
    }


    async searchById(id: number): Promise<Sale | null> {
        const connection = getPoolConnection();
        const querySql: string = `SELECT * FROM sales WHERE id_sale =?`;
        const values = [id];
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
        return result[0].length > 0 ? result[0][0] as Sale : null;
    }



    async remove(id: number): Promise<boolean> {
        const connection = getPoolConnection();
        const querySql = ` DELETE FROM sales WHERE id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);

        return result[0].affectedRows == 1 ? true : false;
    }

    async update(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();

        try {

            const querySales = `UPDATE sales SET id_patient = ?, date_time = ? WHERE id_sale = ?`;
            const salesValues = [
                body.id_patient,
                body.date_time,
                body.id_sale
            ];
            const resultSales = await connection.query<ResultSetHeader>(querySales, salesValues);

            if (resultSales[0].affectedRows === 0) {
                throw new Error("No se encontró la venta para actualizar.");
            }
            const deleteItemsQuery = `DELETE FROM sale_items WHERE id_sale = ?`;
            await connection.query(deleteItemsQuery, [body.id_sale]);

            const saleItemRepository = new SaleItemRepository();
            for (const item of body.items) {

                item.id_sale = body.id_sale ?? 0;
                await saleItemRepository.create(item);
            }

            const totalCostQuery = `UPDATE sales SET sale_total_cost = (SELECT SUM(total_cost_item) FROM sale_items WHERE id_sale = ?) WHERE id_sale = ?`;
            await connection.query(totalCostQuery, [body.id_sale, body.id_sale])
            return body;

        } catch (error) {
            console.error("Error al actualizar la venta:");
            return null;
        }
    }
}