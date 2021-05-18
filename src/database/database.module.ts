import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 import el modulo de typeorm

import config from '../config';

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
  // Como TypeOrmModule es un modulo debemos configurarlo dentro de los imports
  imports: [
    // 👈 use TypeOrmModule y le agregamos una configuracion asincrona para enviar useFactory e inyecciones de dependencias
    TypeOrmModule.forRootAsync({
      inject: [config.KEY], // Realizamos la inyeccion de dependencias como un parametro de entrada
      // useFactory: Permite crear proveedores de forma dinámica .
      // El proveedor real será proporcionado por el valor devuelto por una función de ConfigType de tipo config.
      useFactory: (configService: ConfigType<typeof config>) => {
        // Optenemos los datos de configuracion de las variables de entorno
        //const { user, host, dbName, password, port } = configService.postgres;

        // Retornamos la configuracion de la conexion
        return {
          type: 'postgres', // indicamos el tipo de base de datos de forma explicita
          // host,
          // port,
          // username: user,
          // password,
          // database: dbName,
          url: configService.postgresUrl,
          synchronize: false, // 👈 new attr - las entidades se Sincronizan con la base de datos para poder insertar las tablas
          autoLoadEntities: true, // 👈 new attr - Autocarga de las entidades
          ssl: {
            // Necesario para heroku
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
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
      // useFactory: Permite crear proveedores de forma dinámica .
      // El proveedor real será proporcionado por el valor devuelto por una función de ConfigType de tipo config.
      useFactory: (configService: ConfigType<typeof config>) => {
        // Optenemos los datos de configuracion de las variables de entorno
        //const { user, host, dbName, password, port } = configService.postgres;
        // Una vez echa la inyeccion de dependecias creamos la conexion de dependecias
        const client = new Client({
          // user,
          // host,
          // database: dbName,
          // password,
          // port,
          connectionString: configService.postgresUrl,
          ssl: {
            // Necesario para heroku
            rejectUnauthorized: false,
          },
        });
        client.connect(); // Realizamos la conecion con postgres
        // Retornamos el cliente
        return client;
      },
      inject: [config.KEY], // Realizamos la inyeccion de dependencias como un parametro de entrada
    },
  ],
  // Con exports indicamos que nuestro provide pueda ser utilizado por cualquier componente
  // y no se necesitara ser importado en los componentes
  exports: ['API_KEY', 'PG', TypeOrmModule], // Exportamos directamente TypeOrmModule
})
export class DatabaseModule {}
