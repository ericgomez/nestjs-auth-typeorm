import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
import { PayloadToken } from '../models/token.model';

@Injectable()
// Obtenemos Strategy de la libreria passport-jwt y le ponemos de nombre jwt
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // Reaizamos inyeccion de dependecias
  // Intecya,la variable de entorno config.KEY
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    // Por medio del super podemos indicar la configuracion que tendra el JWT
    super({
      // Variables de configuracion
      // Indicamos que JWT lo obtendremos desde el fromAuthHeaderAsBearerToken
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Indicamos de donde vamos a obtener el JWT
      ignoreExpiration: false, // No ignoramos la expiracion, es decir si el token expiro no permite el request
      secretOrKey: configService.jwtSecret, // Indicamos la ubicacion de la llave secreta
    });
  }

  // Metodo para validar si queremos modificar el resultado del token o si lo queremos mostrar igual
  // en este caso como esta tipado con PayloadToken, podemos hacer esto cambios
  validate(payload: PayloadToken) {
    // retornamos el token
    return payload;
  }
}
