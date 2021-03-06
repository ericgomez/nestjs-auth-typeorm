import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { AuthController } from './controllers/auth.controller';
import config from './../config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JwtModule: Agreamos la configuracion especial
    JwtModule.registerAsync({
      // Inyectamos la informacion de nuestras variables de entorno
      inject: [config.KEY],
      // Como estamos utilizando un proceso asincrono podemos utilizar useFactory
      // Iniciamos la inyeccion de la confirguracion
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret, // jwt: Ingresamo la llave con la que se van a firmar todos los tokens
          signOptions: {
            expiresIn: '10d', // jwt: Indicamos la expiracion en del token
          },
        };
      },
    }),
  ], // Importamos el UsersModule, PassportModule
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
