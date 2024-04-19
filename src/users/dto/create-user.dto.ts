import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsStrongPasswordOptions, MinLength } from "class-validator"



const passOptions: IsStrongPasswordOptions = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
};

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly first_name: string

    @IsNotEmpty()
    @IsString()
    readonly last_name: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'This is not an email' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsStrongPassword(passOptions, { message: "weak password" })
    readonly password: string

    @IsNotEmpty()
    @IsString()
    readonly address: string

    @IsNotEmpty()
    @IsString()
    readonly role: string
}