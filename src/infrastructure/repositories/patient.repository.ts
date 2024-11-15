import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Imanageable } from "../../domain/models/Imanager/interface";
import { Patient } from "../../domain/models/patient";
import { getPoolConnection } from "./config/data.source";
import { Pool } from "mysql2/typings/mysql/lib/Pool";



export class PatientRepository implements Imanageable<Patient> {


  async create(patient: Patient): Promise<any> {
    const connection = getPoolConnection();
    const sql = `INSERT INTO patients (name, last_name, birth_date, known_allergies, insurance_number) VALUES (?, ?, ?, ?, ?)`;
    // porque el uso del tipo de Date es necesario
    const values: Array<string | number | Date> = [
      patient.name,
      patient.last_name,
      patient.birth_date,
      patient.known_allergies,
      patient.insurance_number,
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(sql, values);
    return result[0];
  }

  async read(): Promise<any> {
      const connection = getPoolConnection();
      const sql = `SELECT * FROM patients`;
      const result = await connection.query(sql);
      return result[0];
    }

    async searcheById(id: number): Promise<any> {
        const connection = getPoolConnection();
        const sql = `SELECT * FROM patients WHERE id_patient = ?`;
        const values = [id];
        const result = await connection.query(sql, values);
        return result[0];
    }

    async update(patient: Patient): Promise<any> {
      const connection = getPoolConnection();
      const sql = `UPDATE patients SET name = ?, last_name = ?, birth_date = ?, known_allergies = ?, insurance_number = ? WHERE id_patient = ?`;
      const values = [
        patient.name,
        patient.last_name,
        patient.birth_date,
        patient.known_allergies,
        patient.insurance_number,
        patient.id_patient,
      ];
      const result = await connection.query(sql, values);
      return result[0];
    }

  async delete(id: number): Promise<any> {
    const connection = getPoolConnection();
    const sql = `DELETE FROM patients WHERE id_patient = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(sql, values);
    return result[0];
  }

}