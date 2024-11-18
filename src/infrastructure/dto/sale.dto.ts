import { IsNumber, IsDate, validate, IsArray, ValidateNested, } from "class-validator";
import { Type } from "class-transformer";
import { SaleItemDto } from "./saleItem.dto";



export class saleDto {

    @IsNumber()
    id_patient: number;

    @IsNumber()
    sale_total_cost: number;

    @IsDate()
    date_time: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleItemDto)
    items: SaleItemDto[];

    constructor(body: {

        id_patient: number,
        date_time: Date,
        sale_total_cost: number;
        items: Array<SaleItemDto>

    }) {
        this.id_patient = body.id_patient;
        this.date_time = body.date_time;
        this.sale_total_cost = body.sale_total_cost;
        this.items = body.items;

    }

    async validateDto() {

        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }

}

export class updateDto extends saleDto {

    @IsNumber()
    id_sale: number;

    constructor(body: {
        id_sale: number
        id_patient: number,
        date_time: Date,
        sale_total_cost: number;
        items: Array<SaleItemDto>



    }) {
        super(body);
        this.id_sale = body.id_sale;
    }
}


