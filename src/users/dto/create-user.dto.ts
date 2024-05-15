import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsStrongPasswordOptions, MinLength, isEnum, isStrongPassword } from "class-validator"



const passOptions: IsStrongPasswordOptions = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
};

export class CreateUserDto {


    @IsNotEmpty()
    @MinLength(4, { message: "min. 4 litere" })
    @IsString()
    readonly full_name: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'Format email invalid' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsStrongPassword(passOptions, { message: "Parola slaba" })
    readonly password: string


    @IsNotEmpty()
    @MinLength(10, { message: "min. 10 litere" })
    @IsString()
    readonly address: string


    @IsNotEmpty()
    @MinLength(5, { message: "min. 10 litere" })
    @IsString()
    readonly city: string

    @IsNotEmpty()
    @MinLength(5, { message: "min. 10 litere" })
    @IsString()
    readonly country: string


    @IsNotEmpty()
    @IsString()
    readonly role: string

}