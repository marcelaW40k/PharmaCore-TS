import { ResultSetHeader } from "mysql2";
import { SaleRepository } from "../infrastructure/repositories/sale.repository";
import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { SaleItem } from "../domain/models/saleItem";
import { Sale } from "../domain/models/sale";

export class SaleController implements Imanageable<any> {
    private repository: SaleRepository;

    constructor() {
        this.repository = new SaleRepository()
    }
    async create(body: {
        id_patient: number,
        date_time: Date,
        sale_total_cost: number,
        items: SaleItem[]

    }) {
        try {
            const sale = new Sale({
                id_patient: body.id_patient,
                date_time: body.date_time,
                sale_total_cost: body.sale_total_cost,
                items: body.items
            });
            const resultSale = await this.repository.create(sale);

            sale.items.forEach(item => {
                //validacion de existencia
                item.id_sale = resultSale?.id_sale
                //createrepository de saleitem y lo guardo como atributo de la clase controller
            });
            return resultSale;

        } catch (error: any) {
            console.error(`Error en el registro de la venta: ${error?.message}`);
            return error;
        }

    }
    read(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    searcheById(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    update(body: any): Promise<any> {
        throw new Error("Method not implemented.");
    }


}