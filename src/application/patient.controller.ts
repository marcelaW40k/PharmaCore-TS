import { Patient } from "../domain/models/patient";
import { PatientRepository } from "../infrastructure/repositories/patient.repository";


export class PatientController {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async create(body: Patient): Promise<any> {
        try {
            const patient = {
                id_patient: body.id_patient,
                name: body.name,
                last_name: body.last_name,
                birth_date: body.birth_date,
                known_allergies: body.known_allergies,
                insurance_number: body.insurance_number
            };
            const result = await this.patientRepository.create(patient);
            if (result.affectedRows == 1) {
                console.log(`Paciente agregado con el id: ${result.insertId}`);
            } else {
                console.log("El paciente no se agregó");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al guardar el paciente.", error?.message);
            return error;
        }
    }

    async read(): Promise<any> {
        try {
            const result = await this.patientRepository.read();
            
            if (result && result.length > 0) {
                console.log(`Se encontraron ${result.length} pacientes.`);
            } else {
                console.log("No se encontraron pacientes.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al leer los pacientes.", error?.message);
            return error;
        }
    }
    

    async searcheById(id: number): Promise<any> {
        return await this.patientRepository.searcheById(id);
    }

    async update(patient: Patient): Promise<any> {
        return await this.patientRepository.update(patient);
    }

    async delete(id: number): Promise<any> {
        return await this.patientRepository.delete(id);

    }


}