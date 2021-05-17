import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
// Obtenemos Strategy de passport-local y le ponemos de nombre local
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // Reaizamos inyeccion de dependecias
  constructor(private authService: AuthService) {
    // Por medio del super podemos indicar el nombre que queremos que tenga la naming que recibimos
    // forzamos a que el naming sea el que indicamos en el super()
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // Funcion para validar el usuario y el password
  async validate(email: string, password: string) {
    // Implementam el metodo del servicio AuthService
    const user = await this.authService.validateUser(email, password);

    // Si el usuario es diferente de true
    if (!user) {
      // Mostranos un mensaje de error
      throw new UnauthorizedException('not allow');
    }

    // Caso de que sera true, retornamos el usuario
    return user;
  }
}
