import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // config nos permite utilizar variables de entorno
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

import * as Joi from 'joi'; // 👈

import { enviroments } from './enviroments'; // 👈
import { AuthModule } from './auth/auth.module';
import config from './config'; // 👈 Importamos la configuracion

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      // 👈 Implement ConfigModule
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // 👈 Utilizamos enviroments para leer el archivo a leer
      load: [config], // 👈 Cargamos la configuracion para inyectar
      isGlobal: true, // Indicamos que la configuracion sera Global y todos la podran usar
      validationSchema: Joi.object({
        // 👈 Utilizamos la libreria de JOI para las validaciones
        API_KEY: Joi.string().required(), //Validamos que API_KEY sea string y sera requerido
        DATABASE_NAME: Joi.string().required(), //Validamos que DATABASE_NAME sea string y sera requerido
        DATABASE_PORT: Joi.number().required(), //Validamos que DATABASE_PORT sea numero y sera requerido
        JWT_SECRET: Joi.string().required(), //Validamos que JWT_SECRET sea string y sera requerido
        DATABASE_URL: Joi.number().required(), //Validamos que DATABASE_URL sea numero y sera requerido
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS', //Nombre del Proveedor
      // 👈 implement useFactory de manera async
      useFactory: async (http: HttpService) => {
        // Ejemplo realizando una peticion a una API REST
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        // Retornamos la informacion
        return tasks.data;
      },
      // useFactory permite realizar una injeccion de dependencias
      // En teste caso se injecta el HttpService
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
