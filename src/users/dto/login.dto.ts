import { IsEmail, IsNotEmpty, MinLength, IsString } from "class-validator"




export class LoginUserDto {



    @IsNotEmpty()
    @IsEmail({}, { message: 'This is not an email' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string



}