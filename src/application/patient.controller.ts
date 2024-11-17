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
                console.log(`EL paciente ${patient.name} fue agregado con el id: ${result.insertId}`);
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
                console.log(`Se encontraron ${result.length} pacientes: `, result);
            } else {
                console.log("No se encontraron pacientes.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al leer los pacientes.", error?.message);
            return error;
        }
    }

    async searchById(id_patient: number): Promise<any> {
        try {
            const result = await this.patientRepository.searchById(id_patient);
            if (result) {
                console.log('Paciente encontrado:', result);
            } else {
                console.log("No se encontró el paciente.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al buscar el paciente por ID.", error?.message);
            throw new Error(error.message);
        }
    }
    
    async update(patient: Patient): Promise<any> {
        try {
            const updatedPatient = {
                id_patient: patient.id_patient,
                name: patient.name,
                last_name: patient.last_name,
                birth_date: patient.birth_date,
                known_allergies: patient.known_allergies,
                insurance_number: patient.insurance_number
            };
            const result = await this.patientRepository.update(updatedPatient);
            if (result.affectedRows == 1) {
                console.log(`Paciente actualizado con éxito: ${updatedPatient.id_patient}`);
            } else {
                console.log("No se pudo actualizar el paciente.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al actualizar el paciente.");
            throw new Error(error?.message);
        }
    }

    async delete(id_patient: number): Promise<any> {
        try {
            const result = await this.patientRepository.remove(id_patient);
            if (result.affectedRows == 1) {
                console.log(`Paciente eliminado con éxito: ${id_patient}`);
            } else {
                console.log("No se pudo eliminar el paciente.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al eliminar el paciente.");
            throw new Error(error?.message);
        }
    }
}