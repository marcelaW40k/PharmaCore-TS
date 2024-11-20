import { ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";
import { Prescription } from "../../domain/models/prescription";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";


export class PrescriptionRepository implements Imanageable<Prescription> {
    
    
    async create(body: Prescription): Promise<Prescription | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `INSERT INTO prescriptions (id_patient, id_doctor, issue_date) VALUES (?, ?, ?)`;
        const values = [
            body.id_patient,
            body.id_doctor,
            body.issue_date,
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        body.id_prescription = result[0].insertId;
        return result[0].affectedRows > 0 ? body : null;
    }

    async read(): Promise<Prescription[]> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT prescriptions.id_prescription, prescriptions.id_patient, prescriptions.id_doctor, prescriptions.issue_date
         FROM prescriptions INNER JOIN patients ON prescriptions.id_patient = patients.id_patient INNER JOIN doctors ON prescriptions.id_doctor = doctors.id_doctor`;
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql);
        return result[0] as Prescription[];
    }

   async update(body: Prescription): Promise<Prescription | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `UPDATE prescriptions SET id_patient = ?, id_doctor = ?, issue_date = ? WHERE id_prescription = ?`;
        const values = [
            body.id_patient,
            body.id_doctor,
            body.issue_date,
            body.id_prescription
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0].affectedRows > 0 ? body : null;
    }

   async remove(id: number): Promise<boolean> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `DELETE FROM prescriptions WHERE id_prescription = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0].affectedRows === 1 ? true : false;
   }

   async searcheById(id: number): Promise<Prescription | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT * FROM prescriptions WHERE id_prescription = ?`;
        const values = [id];
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
        return result[0].length > 0 ? result[0][0] as Prescription : null;
   }
     
}