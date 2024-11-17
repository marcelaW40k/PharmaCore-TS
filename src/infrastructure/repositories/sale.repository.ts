import { Sale } from "../../domain/models/sale";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";

export class SaleRepository implements Imanageable<any> {
    async create(body: Sale): Promise<any> {
        const connection: Pool = getPoolConnection();
        const querySale = 'INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?,?)';
        const values: Array<string | number | Date> = [body.id_patient, body.date_time, body.sale_total_cost];
        const Result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySale, values);
        return Result[0];
    }

    async read(): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sales`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async searcheById(id: number): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sales WHERE id_sale =?`;
        const values = [id]
        const result = await connection.query<RowDataPacket[]>(querySql, values);
        return result[0];
    }


    async delete(id: number): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM sales WHERE id_sale =?`;
        const values = [id]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];

    }


    async update(body: Sale): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `UPDATE sales SET id_patient= ?, date_time = ?, sale_total_cost = ? WHERE id_sale = ?`;
        const values = [
            body.id_patient,
            body.date_time,
            body.sale_total_cost,
            body.id_sale,
        ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

}
