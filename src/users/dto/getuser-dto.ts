import { IsNotEmpty, IsString } from "class-validator"




export class GetUserDto {


    @IsNotEmpty()
    @IsString()
    readonly full_name: string


    @IsNotEmpty()
    @IsString()
    readonly email: string


    @IsNotEmpty()
    @IsString()
    readonly address: string

    @IsNotEmpty()
    @IsString()
    readonly city: string


    @IsNotEmpty()
    @IsString()
    readonly country: string

}