import { IsNumber, IsString, Length, validate } from "class-validator";

export class userDto {
    @IsString()
    @Length(3,10)
    name:string


}