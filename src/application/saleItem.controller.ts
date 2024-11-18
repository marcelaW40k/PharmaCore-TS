import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { SaleItem } from "../domain/models/saleItem";
import { SaleItemDto } from "../infrastructure/dto/saleItem.dto";
import { SaleItemRepository } from "../infrastructure/repositories/saleItem.repository";

export class SaleItemController implements Imanageable<SaleItem> {
    private repository: SaleItemRepository;
    constructor() {
        this.repository = new SaleItemRepository();
    }


    async create(body:
        {
            id_sale: number,
            id_medicine: number,
            quantity: number,
            item_total_cost: number
        }
    ): Promise<SaleItem | null> {
        try {
            const result = await this.repository.create(body)
            if (result && result.id_item) {
                console.log(`el item se agregó con exito`)
                return result;
            } else {
                console.log(`el item pudo ser agregado`)
                return null;
            }

        } catch (error: any) {
            console.log("ha ocurrido un erro al agregar el item.", error.message)
            return null
        }

    }


}




