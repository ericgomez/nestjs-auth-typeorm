import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {} // Obtenemos el UsersService por medio de la inyeccion de dependencias

  // Metodo para validar el User por medio del email y la contraseña
  async validateUser(email: string, password: string) {
    // Obtenemos el usuario
    const user = await this.usersService.findByEmail(email);

    // Si el usuario existe
    if (user) {
      // Utilizamos la libreria bcrypt para validar(Comparar) el password
      const isMatch = await bcrypt.compare(password, user.password);

      // Si el usario y constraseña coinciden
      if (isMatch) {
        // Retornamos true
        return user;
      }
    }

    // En cualquier otro caso retornamos null
    return null;
  }

  // Metodo para generar el JWT
  // Recibimos un usuario de tipo user
  generateJWT(user: User) {
    // Indicamos la informacion que va a estar dentro del token tipandolo como PayloadToken personalizado
    const payload: PayloadToken = { role: user.role, sub: user.id }; // Agregamos el Rol y el id del usuario

    return {
      // Retornamos el access_token del JWT
      access_token: this.jwtService.sign(payload),
      // Retornamos el usuario
      user,
    };
  }
}
