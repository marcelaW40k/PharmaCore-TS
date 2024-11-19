import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { Patient } from "../domain/models/patient";
import { PatientDto } from "../infrastructure/dto/patient.dto";
import { PatientRepository } from "../infrastructure/repositories/patient.repository";


export class PatientController implements Imanageable<Patient> {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async create(body: Patient): Promise<Patient | null> {
        try {
            const patientDto = new PatientDto(body);
            const errors = await patientDto.validateDto();
            if (errors.length > 0) {
                console.log('Validación fallida. error: ', errors);
                return null;
            }
            const patient = new Patient(body);
            const result = await this.patientRepository.create(patient);
            if (result && result.id_patient) {
                console.log(`El paciente ${patientDto.name} fue agregado correctamente.`);
                return result;
            } else {
                console.log("El paciente no se agregó");
            } return null;
        } catch (error: any) {
            console.error("Ha ocurrido un error al guardar el paciente:", error.message);
            return null;
        }
        
    }

    async read(): Promise<Patient[]> {
        try {
            const result = await this.patientRepository.read();

            if (result.length > 0) {
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

    async searchById(id_patient: number): Promise<Patient | null> {
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

    async remove(id_patient: number): Promise<boolean> {
        try {
            const result = await this.patientRepository.remove(id_patient);
            if (result === true) {
                console.log(`Paciente eliminado con éxito.`);
            } else {
                console.log(`No se pudo eliminar el paciente con id ${id_patient}.`);
                return false;
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al eliminar el paciente." + error?.message);
            return false;
        }
    }

    async update(patient: Patient): Promise<Patient | null> {
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
}