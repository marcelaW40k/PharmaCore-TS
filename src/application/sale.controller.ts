import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { Sale } from "../domain/models/sale";
import { SaleItem } from "../domain/models/saleItem";
//import { SaleDto, UpdateDto } from "../infrastructure/dto/sale.dto";
import { SaleRepository } from "../infrastructure/repositories/sale.repository";


export class SaleController implements Imanageable<Sale> {
    private repository: SaleRepository;
    constructor() {
        this.repository = new SaleRepository();
    }

    async create(body:
        {
            id_patient: string,
            date_time: Date,
            items: Array<SaleItem>
        }
    ): Promise<Sale | null> {
        try {
            const patientExists = await this.repository.patientExists(body.id_patient);
            if (!patientExists) {
                console.log("Debes crear el paciente antes de proceder con la venta");
                return null;
            }

            /* const dto = new SaleDto(body);
             const errores = await dto.validateDto();
             if (errores.length > 0) {
                 console.log("Existe errores en los datos", errores)
                 return null;
             }*/

            const sale = new Sale(body);

            const result = await this.repository.create(sale);
            if (result && result.id_sale) {
                console.log(`la venta se creó con exito`)
                return result;
            } else {
                console.log(`la venta no pudo ser creada`)
                return null;
            }

        } catch (error: any) {
            console.log("ha ocurrido un error al crear la venta.", error)
            return null
        }
    }

    async read(): Promise<Sale[]> {
        const result: Sale[] = await this.repository.read()
        if (result.length > 0) {
            console.log("ventas obtenidas")

        } else {
            console.log("no hay ventas registradas")
        }
        return result;
    }

    async searchById(id: number): Promise<Sale | null> {
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
                console.log(`venta eliminada`)
                return true;
            } else {
                console.log(`no se pudo eliminar la venta con id ${id}`)
                return false;
            }
        }

        catch (error: any) {
            console.log(`Ocurrio un error inesperado con la venta con id ${id}`, error)
            return false;

        };

    }

    async update(body: {
        id_sale: number,
        id_patient: string,
        date_time: Date,
        items: Array<SaleItem>
    }): Promise<Sale | null> {

        try {
            /* const dto = new UpdateDto(body);
             const errores = await dto.validateDto();
             if (errores.length > 0) {
                 console.log("Existe errores en los datos", errores)
                 return null
             }*/

            const sale = new Sale(body);
            const result = await this.repository.update(sale);
            if (result) {
                console.log(`venta actualizada`)
                return result;
            } else {
                console.log(`No se pudo actualizar la venta con id ${body.id_sale}`)
                return null;
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error inesperado", error.message)
            return null;
        }
    }
}

