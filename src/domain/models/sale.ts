
import { SaleItem } from "./saleItem";

export class Sale {
    id_sale?: number;
    id_patient: number;
    date_time: Date;
    sale_total_cost: number;
    items: Array<SaleItem>

    constructor(infoSale:

        {
            id_sale?: number
            id_patient: number,
            date_time: Date,
            items: Array<SaleItem>
        }) {
        this.id_sale = infoSale.id_sale
        this.id_patient = infoSale.id_patient
        this.date_time = infoSale.date_time
        this.sale_total_cost = this.calculateTotalCost()
        this.items = infoSale.items

    }
    private calculateTotalCost() {
        let totalCost = 0
        this.items.forEach(item => {
            totalCost += item.total_cost_item * item.quantity
        })
        return totalCost
    }
}