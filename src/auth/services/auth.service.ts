import { Injectable } from '@nestjs/common';
import { UsersService } from './../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {} // Obtenemos el UsersService por medio de la inyeccion de dependencias

  // Metodo para validar el User por medio del email y la contraseña
  async validateUser(email: string, password: string) {
    // Obtenemos el usuario
    const user = await this.usersService.findByEmail(email);
    // Utilizamos la libreria bcrypt para validar(Comparar) el password
    const isMatch = await bcrypt.compare(password, user.password);

    // Si el usuario como la contraseña coinciden
    if (user && isMatch) {
      // Retornamos true
      return user;
    }

    // En cualquier otro caso retornamos null
    return null;
  }
}
