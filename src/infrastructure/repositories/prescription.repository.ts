import { ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";
import { Imanageable } from "../../domain/models/Imanager/interface";
import { Prescription } from "../../domain/models/prescription";
import { getPoolConnection } from "./config/data.source";

//crear un repositorio de prescripciones cpn la interfaz Imanageable

export class PrescriptionRepository implements Imanageable<Prescription> {
    
    async create(body: Prescription): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `INSERT INTO prescriptions (id_patient, id_doctor, issue_date) VALUES (?, ?, ?)`;
        const values = [
            body.id_patient,
            body.id_doctor,
            body.issue_date,
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async read(): Promise<RowDataPacket[]> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT * FROM prescriptions`;
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql);
        return result[0];
    }

    async update(body: Prescription): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `UPDATE prescriptions SET id_patient = ?, id_doctor = ?, issue_date = ? WHERE id_prescription = ?`;
        const values = [
            body.id_patient,
            body.id_doctor,
            body.issue_date,
            body.id_prescription
        ]

        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `DELETE FROM prescriptions WHERE id_prescription = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async searcheById(id: number): Promise<RowDataPacket[]> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT * FROM prescriptions WHERE id_prescription = ?`;
        const values = [id];
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
     
}