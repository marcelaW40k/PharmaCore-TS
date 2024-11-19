import { Sale } from "../../domain/models/sale";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { SaleItem } from "../../domain/models/saleItem";

export class SaleRepository implements Imanageable<Sale> {

    async create(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();
        body.calculateTotalCost();
        const querySql: string = 'INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?,?)';
        const values: Array<string | number | undefined | Date> =
            [body.id_patient,
            body.date_time,
            body.sale_total_cost];
        ;
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
            querySql,
            values
        );
        body.id_sale = result[0].insertId;
        return result[0].affectedRows == 1 ? body : null;
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
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
            querySql,
            values
        );

        return result[0].affectedRows == 1 ? true : false;
    }

    async update(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();
        body.calculateTotalCost();
        const querySql = `UPDATE sales SET id_patient= ?, date_time = ?, sale_total_cost =?, items = ? WHERE id_sale = ?`;
        const values = [
            body.id_patient,
            body.date_time,
            body.sale_total_cost,
            body.items,
            body.id_sale];
        const resultSales = await connection.query<ResultSetHeader>(querySql, values);


        return resultSales[0].affectedRows == 1 ? body : null;


    }
}