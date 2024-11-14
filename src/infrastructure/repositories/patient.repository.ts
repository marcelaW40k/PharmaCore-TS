import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Imanageable } from "../../domain/models/Imanager/interface";
import { Patient } from "../../domain/models/patient";
import { getPoolConnection } from "./config/data.source";


export class PatientRepository implements Imanageable<Patient> {
    async create(body: Patient): Promise<ResultSetHeader> {
         const sql = `INSERT INTO patients (name, last_name, birth_date, known_allergies, insurance_number) VALUES (?, ?, ?, ?, ?)`; 
         const values = [body.name, body.last_name, body.birth_date, body.known_allergies, body.insurance_number];
          try { 
            const [result] = await getPoolConnection().query(sql, values) as [ResultSetHeader, any]; 
            return result; 
        } catch (error: any) {
             throw new Error(error); } 
        }
        
    read(): Promise<RowDataPacket[]> {
        throw new Error("Method not implemented.");
    }
    searcheById(id: number): Array<any> {
        throw new Error("Method not implemented.");
    }
    delet(id: any): Promise<ResultSetHeader> {
        throw new Error("Method not implemented.");
    }
    update(body: Patient): Promise<ResultSetHeader> {
        throw new Error("Method not implemented.");
    }
}
    
   /* private poolConnection: any;
    constructor() {
        this.poolConnection = getPoolConnection();
    }

    async create(patient: Patient): Promise<Patient> {
        const sql = `INSERT INTO patients (name, last_name, birth_date, known_allergies, insurance_number) VALUES (?, ?, ?, ?, ?)`;
        const values = [patient.name, patient.last_name, patient.birth_date, patient.known_allergies, patient.insurance_number];
        try {
            const result = await this.poolConnection.query(sql, values);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async read(): Promise<Patient[]> {
        const sql = `SELECT * FROM patients`;
        try {
            const result = await this.poolConnection.query(sql);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(patient: Patient): Promise<Patient> {
        const sql = `UPDATE patients SET name = ?, last_name = ?, birth_date = ?, known_allergies = ?, insurance_number = ? WHERE id_patient = ?`;
        const values = [patient.name, patient.last_name, patient.birth_date, patient.known_allergies, patient.insurance_number, patient.id_patient];
        try {
            const result = await this.poolConnection.query(sql, values);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }
} */