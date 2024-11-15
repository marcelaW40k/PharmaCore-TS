import "reflect-metadata";
import { IsDate, IsNumber, validate } from "class-validator";

export class PrescriptionDto {

    @IsNumber()
    id_patient: number;

    @IsNumber()
    id_doctor: number;

    @IsDate()
    issue_date: Date;

    constructor(body: { id_patient: number, id_doctor: number, issue_date: Date }) {
        this.id_patient = body.id_patient;
        this.id_doctor = body.id_doctor;
        this.issue_date = body.issue_date;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
          });
    }

}