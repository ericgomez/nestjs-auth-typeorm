import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './../decorators/public.decorator'; // Obtenemos la variable de nuestro decorador personalizado

import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Reazalimos la inyeccion de dependecias de Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Para acceder a la(s) función(es) de la ruta (metadatos personalizados), usaremos la Reflector
    // Obtenemos por medio de get el valor de nuestro decorador personalizado
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // Validamos si es public
    if (isPublic) {
      // En caso de que sea poublico retornamos automaticamente true
      return true;
    }

    // En caso que no sea publico contrinuamos con la validacion del Header
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
