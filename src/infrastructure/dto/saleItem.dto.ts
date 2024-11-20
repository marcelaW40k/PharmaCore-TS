/*import { IsNumber, validate } from "class-validator";

export class SaleItemDto {

    @IsNumber()
    id_sale: number;

    @IsNumber()
    id_medicine: number;

    @IsNumber()
    quantity: number;

    total_cost_item?: number;


    constructor(body: {

        id_sale: number;
        id_medicine: number;
        quantity: number;


    }) {
        this.id_sale = body.id_sale;
        this.id_medicine = body.id_medicine;
        this.quantity = body.quantity;
    }

    async validateDto() {

        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }

}

export class UpdateDto extends SaleItemDto {

    @IsNumber()
    id_item: number;

    constructor(body: {
        id_item: number
        id_sale: number;
        id_medicine: number;
        quantity: number;
        total_cost_item?: number;



    }) {
        super(body);
        this.id_item = body.id_item;
    }
}
*/