import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Para leer metadata
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  // Realizamos la inyeccion de dependecias de Reflector para leer metadata
  constructor(private reflector: Reflector) {}

  // Metodo que sobre escribe al canActivate
  // Creamos un contexto para extender el contexto
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Obtenemos el Array de roles
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    // Si el decorador no tiene roles simplemete retornamos true, ya que no tiene validacion de roles en el controller
    // Posibles valores que retorne el array ['admin', 'customer'];
    if (!roles) {
      return true;
    }

    // Obtenemos la informacion por medio del request
    const request = context.switchToHttp().getRequest();
    // Obtenemos del request el user, con la informacion de desincriptada
    const user = request.user as PayloadToken; //Ejemplo: Informacion que no retornaria { role: 'admin', sub: 1212 }

    // Verificamos el si el usuario tiene el rol correcto registrado, verificamos el array uno por uno con 'some'
    const isAuth = roles.some((role) => role === user.role);
    // Si el resultado es falso
    if (!isAuth) {
      // Mostramos un mensaje de error que el rol esta mal
      throw new UnauthorizedException('your role is wrong');
    }

    // Si el rol es correcto retornamos true y damos acceso
    return isAuth;
  }
}
