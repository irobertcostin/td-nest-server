import { Controller, Get, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { Query as ExpressQuery } from "express-serve-static-core"
import { User } from './schema/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/getuser-dto';
import { EmailInterceptor } from 'src/interceptors/email.interceptor';
import { IdValidationInterceptor } from 'src/interceptors/id-validation.interceptor';
import { RoleInterceptor } from 'src/interceptors/role.interceptor';


@Controller('users')
@UseInterceptors(EmailInterceptor, IdValidationInterceptor, RoleInterceptor)
export class UsersController {

    constructor(private userService: UsersService) { }



    @Post('register')
    register(
        @Body()
        createUserDto: CreateUserDto
    ): Promise<{ token: string }> {
        return this.userService.register(createUserDto)
    }



    @Post('login')
    login(
        @Body()
        loginUserDto: LoginUserDto
    ): Promise<{ token: string }> {
        return this.userService.login(loginUserDto)
    }

    @Get('get')
    @UseGuards(AuthGuard())
    async getUser(
        @Req() request
    ): Promise<GetUserDto> {

        return this.userService.getUser(request.user)
    }



}
