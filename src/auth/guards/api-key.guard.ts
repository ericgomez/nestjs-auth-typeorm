import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); // Obtenemos el Request y Retornamos un valor de tipo request
    const authHeader = request.header('Auth'); // Esperamos recibir el el header el request Auth
    const isAuth = authHeader === '1234'; // Validamos que en el Header venga el valor 1234 para dar acceso por medio de un true o false

    if (!isAuth) {
      // Si isAuth es diferente de true
      throw new UnauthorizedException('not allow');
    }
    // Si isAuth es true
    return true;
  }
}
