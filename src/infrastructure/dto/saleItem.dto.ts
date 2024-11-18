import { IsNumber, validate } from "class-validator";

export class saleItemDto {

    @IsNumber()
    id_sale: number;
    id_medicine: number;
    quantity: number;
    item_total_cost: number;


    constructor(body: {

        id_sale: number;
        id_medicine: number;
        quantity: number;
        item_total_cost: number;

    }) {
        this.id_sale = body.id_sale;
        this.id_medicine = body.id_medicine;
        this.quantity = body.quantity;
        this.item_total_cost = body.item_total_cost;

    }

    async validateDto() {

        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }

}

export class updateDto extends saleItemDto {

    @IsNumber()
    id_item: number;

    constructor(body: {
        id_item: number
        id_sale: number;
        id_medicine: number;
        quantity: number;
        item_total_cost: number;



    }) {
        super(body);
        this.id_item = body.id_item;
    }
}
