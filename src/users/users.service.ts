import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from "mongoose"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { GetUserDto } from './dto/getuser-dto';
import { User } from './schema/users.schema';


@Injectable()
export class UsersService {


    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }



    async register(createUserDto: CreateUserDto): Promise<{ token: string }> {

        const { first_name, last_name, email, password, address, role } = createUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            address,
            role
        })

        const token = this.jwtService.sign({ id: user._id })

        return { token }

    }


    async login(loginDto: LoginUserDto): Promise<{ token: string }> {

        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new NotFoundException('Invalid email address')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token }

    }


    async getUser(request: any): Promise<GetUserDto> {

        const user: GetUserDto = {
            first_name: request.first_name,
            last_name: request.last_name,
            email: request.email,
            address: request.address,
            role: request.role
        }

        return user
    }



}
