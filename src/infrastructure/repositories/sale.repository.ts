import { Sale } from "../../domain/models/sale";
import { SaleItem } from "../../domain/models/saleItem";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Imanageable } from "../../domain/models/Imanager/interface";
import { getPoolConnection } from "./config/data.source";

export class SaleRepository implements Imanageable<Sale> {
    async create(body: Sale): Promise<Sale> {
        const connection: Pool = getPoolConnection();
        const querySale = 'INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?,?)';
        const values: Array<string | number | Date> = [body.id_patient, body.date_time, body.sale_total_cost];
        const saleResult: [ResultSetHeader, FieldPacket[]] = await connection.query(querySale, values);

        const saleId = saleResult[0].insertId

        const queryItems = 'INSERT INTO item_sales (id_sale, id_medicine, quantity, total_cost_item) VALUES (?,?,?,?)';
        const valuesItems = body.items.map((item: SaleItem) => [
            saleId,
            item.id_medicine,
            item.quantity,
            item.total_cost_item
        ]);
        const saleItemResult: [ResultSetHeader, FieldPacket[]] = await connection.query<ResultSetHeader>(queryItems, [valuesItems]);
        return saleResult[0];
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
