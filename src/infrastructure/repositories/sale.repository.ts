import { Sale } from "../../domain/models/sale";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";

export class SaleRepository implements Imanageable<Sale> {

    async create(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();
        const querySql: string = 'INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?,?)';
        const values: Array<string | number | Date> =
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
        const querySql = `UPDATE sale_items SET id_sale= ?, id_medicine = ?, quantity = ?, item_total_cost =?, WHERE id_item = ?`;
        const values = [
            body.id_patient,
            body.date_time,
            body.sale_total_cost,
            body.id_sale];
        const result = await connection.query<ResultSetHeader>(querySql, values);

        body.id_sale = result[0].insertId;
        return result[0].affectedRows == 1 ? body : null;


    }
}