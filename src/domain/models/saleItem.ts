export class SaleItem {
    id_item?: number;
    id_sale: number;
    id_medicine: number;
    quantity: number;
    item_total_cost?: number;


    constructor(infoSaleItem:

        {
            id_item?: number;
            id_sale: number;
            id_medicine: number;
            quantity: number;
            item_total_cost?: number;
        }) {
        this.id_item = infoSaleItem.id_item;
        this.id_sale = infoSaleItem.id_sale;
        this.id_medicine = infoSaleItem.id_medicine;
        this.quantity = infoSaleItem.quantity;
        this.item_total_cost = infoSaleItem.item_total_cost;
    }
}