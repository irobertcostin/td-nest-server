import { Controller, Get, Query, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { EmailInterceptor } from 'src/interceptors/email.interceptor';
import { IdValidationInterceptor } from 'src/interceptors/id-validation.interceptor';
import { UsersService } from './users.service';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UsernameInterceptor } from 'src/interceptors/name.interceptor';
import { Query as ExpressQuery } from "express-serve-static-core"
import { ActivateUser } from './dto/activate-user.dto';
import { User } from './schema/users.schema';
import { PassResetDto } from './dto/pass-reset.dto';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/getuser-dto';


@Controller('users')
@UseInterceptors(EmailInterceptor, IdValidationInterceptor, UsernameInterceptor)
export class UsersController {

    constructor(
        private userService: UsersService

    ) { }

    @Throttle({ default: { limit: 1, ttl: 60000 } })
    @Post('register')
    register(
        @Body()
        createUserDto: CreateUserDto
    ): Promise<{ message: string }> {
        return this.userService.register(createUserDto)
    }

    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post('activate-account')
    activateAccount(
        @Body()
        body: ActivateUser
    ): Promise<{ message: string }> {
        return this.userService.activateAccount(body);
    }

    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post('resend-validation-token')
    resendActivationToken(
        @Body()
        body: any
    ): Promise<{ message: string }> {
        return this.userService.resendActivationToken(body.email);
    }



    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post('login')
    login(
        @Body()
        loginUserDto: LoginUserDto
    ): Promise<any> {
        return this.userService.login(loginUserDto)
    }

    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post('forgot-password')
    forgotPassword(
        @Body()
        body: PassResetDto
    ): Promise<any> {
        return this.userService.forgotPassword(body)
    }


    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post('confirm-password-reset')
    confirmPasswordReset(
        @Body()
        body: ActivateUser
    ): Promise<any> {
        return this.userService.confirmPasswordReset(body)
    }


    @Get('get-user')
    @UseGuards(AuthGuard())
    async getUser(
        @Req() req
    ): Promise<GetUserDto> {
        return this.userService.getUser(req.user)
    }


}
