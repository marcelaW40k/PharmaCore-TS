import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { Medicine } from "../domain/models/medicine";
import { MedicineDto } from "../infrastructure/dto/medicine.dto";
import { MedicineRepository } from "../infrastructure/repositories/config/medicines.repository";

export class MedicineController implements Imanageable<Medicine> {
    private repository: MedicineRepository;
    constructor() {
        this.repository = new MedicineRepository();
    }

    async create(body:
        {
            name_medicine: string,
            form: string,
            prescription: boolean,
            quantity_stock: number,
            unit_cost: number
        }
    ): Promise<Medicine | null> {
        try {
            const dto = new MedicineDto(body);
            const errores = await dto.validateDto();
            if (errores.length > 0) {
                console.log("Existe errores en los datos", errores)
                return null;
            }
            
            const medicine = new Medicine(body);

            const result = await this.repository.create(medicine);
            if (result && result.id_medicine) {
                console.log(`el item se agregó con exito`)
                return result;
            } else {
                console.log(`el item pudo ser agregado`)
                return null;
            }

        } catch (error: any) {
            console.log("ha ocurrido un erro al agregar el medicamento.", error.message)
            return null
        }

    }

    async read(): Promise<Medicine[]> {
        const result: Medicine[] = await this.repository.read()
        if (result.length == 1) {
            console.log("medicamentos obtenidos")
        } else {
            console.log("no hay medicamentos registrados")
        }
        return result;
    }

    async searchById(id: number): Promise<Medicine | null> {
        try {
            const result = await this.repository.searchById(id)
            if (result) {
                return result
            } else {
                return null;
            }

        } catch (error: any) {
            console.log("Ha ocurrido un error inesperado", error.message)
            return null;
        }
    }
    async remove(id: number): Promise<boolean> {

        try {
            const result = await this.repository.remove(id)

            if (result === true) {
                console.log(`Medicamento eliminado`)
                return true;
            } else {
                console.log(`no se pudo eliminar el medicamento con id ${id}`)
                return false;
            }
        }

        catch (error) {
            console.log(`Ocurrio un error inesperado con el medicamento con ${id}`)
            return false;

        };

        


    }
    // async update(body: Medicine): Promise<Medicine | null> {

    //   try {
  
    //     if (body.id_medicine == null) { console.log("El campo 'id_medicine' es necesario y no puede ser null o undefined"); return null; }
  
    //     const dto = new updateDto({
    //       id_user: body.id_user, email: body.email, password: body.password, id_role: body.id_role
  
    //     })
    //     const result:any = await this.repository.update(body)
  
    //     if(result.affectedRows == 1){
    //       console.log("usuario actualizado")
    //       return body;
    //     }else {
    //       console.log("no se pudo actualizar el usuario")
    //       return null;
    //     }
    //   }catch(error:any){
    //     console.log("Ha ocurrido un error inesperado", error.message)
    //     return null;
    //   }
    // }
  }