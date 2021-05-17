import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Para leer metadata
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
// Esta es una manera de como podemos extender desde un Guardian personalizado en este caso AuthGuard('jwt')
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Realizamos la inyeccion de dependecias de Reflector para leer metadata
  constructor(private reflector: Reflector) {
    // Siempre que extendemos de una clase, debemos utilizar la clase super()
    super();
  }

  // Metodo que sobre escribe al canActivate
  // Creamos un contexto para extender el contexto
  canActivate(context: ExecutionContext) {
    // Verificamos si el endpoint es publico
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // si es verdadero(publico)
    if (isPublic) {
      // Retornamos true para damos permisos
      return true;
    }
    // Si no viene la metatadata(enviamos un false)
    return super.canActivate(context);
  }
}
