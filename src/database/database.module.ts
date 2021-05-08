import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect(); // Realizamos la conexion

// El decorador @Global hace que el módulo tenga un alcance global.
// Los módulos globales deben registrarse solo una vez , generalmente por el módulo raíz o principal
@Global()
@Module({
  providers: [
    {
      // El API_KEY token se resolverá en el process.env.NODE_ENV objeto simulado
      provide: 'API_KEY',
      // useValue: API_KEY, // 👈 El API_KEY token se resolverá en el API_KEY

      // Otro ejemplo: El API_KEY token se resolverá dependiendo de la variable de ambiente process.env.NODE_ENV
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      // El PG es el nombre de nuestro provider postgres
      provide: 'PG',
      // El provider PG realizara la inyeccion de dependencias del valor que tiene el client que ya tiene la conexion activa
      useValue: client,
    },
  ],
  // Con exports indicamos que nuestro provide pueda ser utilizado por cualquier componente
  // y no se necesitara ser importado en los componentes
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
