import { Imanageable } from "../domain/models/Imanager/interface";
import { Prescription } from "../domain/models/prescription";
import { PrescriptionDto } from "../infrastructure/dto/Prescription.dto";
import { PrescriptionRepository } from "../infrastructure/repositories/prescription.repository";

export class PrescriptionController implements Imanageable<Prescription> {
    private repository: PrescriptionRepository;
    constructor() {
        this.repository = new PrescriptionRepository();
    }


    async create(body:{id_patient: number, id_doctor: number, issue_date: Date}){ // 
        try {

            const dto = new PrescriptionDto(body);
            const errores = await dto.validateDto();
            if(errores.length > 0) {
                return{ok: false, message: "El request tiene errores", error: errores}
            }
            const prescription = new Prescription(body);
            const result = await this.repository.create(prescription);
            if(result.affectedRows == 1){
                return {ok: true, message: "Prescripcion creada correctamente", id: result.insertId}
            }
            else {
                return {ok: false, message: "No se pudo crear la prescripcion"}
            }
        }
        catch (error) {
            return {ok: false, message: "Ha ocurrido un error inesperado", error: error}
       
    }

}