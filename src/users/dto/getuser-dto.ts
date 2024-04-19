import { IsNotEmpty, IsString } from "class-validator"




export class GetUserDto {


    @IsNotEmpty()
    @IsString()
    readonly first_name: string


    @IsNotEmpty()
    @IsString()
    readonly last_name: string


    @IsNotEmpty()
    @IsString()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly address: string


    @IsNotEmpty()
    @IsString()
    readonly role: string

}