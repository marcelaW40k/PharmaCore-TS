/*import { IsNumber, IsDate, validate, IsArray, ValidateNested, } from "class-validator";
import { Type } from "class-transformer";
import { SaleItem } from "../../domain/models/saleItem";
import 'reflect-metadata';




export class SaleDto {

    @IsNumber()
    id_patient: number;


    sale_total_cost?: number;

    @IsDate({ message: "date_time must be a Date instance" })
    @Type(() => Date)
    date_time!: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleItem)
    items: SaleItem[];

    constructor(body: {

        id_patient: number,
        date_time: Date,
        items: Array<SaleItem>

    }) {
        this.id_patient = body.id_patient;
        this.date_time = body.date_time;
        this.items = body.items;

    }

    async validateDto() {

        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }

}

export class UpdateDto extends SaleDto {

    @IsNumber()
    id_sale: number;

    constructor(body: {
        id_sale: number
        id_patient: number,
        date_time: Date,
        sale_total_cost?: number;
        items: Array<SaleItem>



    }) {
        super(body);
        this.id_sale = body.id_sale;
    }
}
*/

