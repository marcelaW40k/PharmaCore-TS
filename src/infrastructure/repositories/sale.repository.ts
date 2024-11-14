import { Sale } from "../../domain/models/sale";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Imanageable } from "../../domain/models/Imanager/interface";
import { getPoolConnection } from "./config/data.source";

export class SaleRepository implements Imanageable<Sale> {
    async create(body: Sale): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?,?)`;
        const values: Array<string | number | Date> = [body.id_patient, body.date_time, body.sale_total_cost];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async read(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sales`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async searcheById(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sales WHERE id_sale =?`;
        const values = [id]
        const result = await connection.query<RowDataPacket[]>(querySql, values);
        return result[0];
    }


    async delete(id: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM sales WHERE id =?`;
        const values = [id]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];

    }


    async update(body: Sale): Promise<ResultSetHeader> {
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
