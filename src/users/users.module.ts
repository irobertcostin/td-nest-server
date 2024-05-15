import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from './jwt.strategy';
import { UsernameInterceptor } from 'src/interceptors/name.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TempPasswords, TempPasswordsSchema } from './schema/temp-passwords.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, UsernameInterceptor],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TempPasswords.name, schema: TempPasswordsSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_VALIDITY')
          }
        }
      }
    }),
  ],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule { }
