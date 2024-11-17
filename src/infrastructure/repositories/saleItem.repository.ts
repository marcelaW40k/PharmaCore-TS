import { SaleItem } from "../../domain/models/saleItem";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";

export class SaleItemRepository implements Imanageable<SaleItem> {
    async create(body: SaleItem): Promise<any> {
        const connection: Pool = getPoolConnection();
        const querySale = 'INSERT INTO item_sales (id_sale, id_medicine, quantity, total_cost_item) VALUES (?,?,?,?)';
        const values: Array<string | number | Date> = [body.id_sale, body.id_medicine, body.quantity, body.item_total_cost];
        const Result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySale, values);
        return Result[0];
    }

    async read(): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM item_sales`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async searcheById(id: number): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM item_sales WHERE id_item = ?`;
        const values = [id]
        const result = await connection.query<RowDataPacket[]>(querySql, values);
        return result[0];
    }


    async remove(id: number): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM item_sales WHERE id_item =?`;
        const values = [id]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];

    }


    async update(body: SaleItem): Promise<any> {
        const connection = getPoolConnection();
        const querySql = `UPDATE item_sales SET id_sale= ?, id_medicine = ?, quantity = ?, item_total_cost =?, WHERE id_item = ?`;
        const values = [
            body.id_sale,
            body.id_medicine,
            body.quantity,
            body.item_total_cost,
        ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

}
