import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; // 👈 Import ConfigType
import { Client } from 'pg';

import config from './config'; // 👈
@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('PG') private clientPg: Client, // 👈 inject PG el cual es de tipo Cliente de postgrest
    @Inject('TASKS') private tasks: any[], // 👈 inject TASKS el cual es un array de cualquier cosa
    @Inject(config.KEY) private configService: ConfigType<typeof config>, // 👈 inject ConfigType
  ) {} // 👈 Injectando API_KEY de manera segura

  getHello(): string {
    const apiKey = this.configService.apiKey; // 👈 Obtenemos en valor tipado para apiKey
    const name = this.configService.database.name; // 👈 Obtenemos en valor tipado para database.name

    // Imprimos el valor de inyectado
    return `Hello World! ${apiKey} ${name}`;
  }

  // Creamos un metodo para Obtener las tareas
  getTasks() {
    // Retornamos una promesa que contine dos estados (resolve, reject)
    return new Promise((resolve, reject) => {
      // Ejecutamos el query o consulta
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          // En caso de error retornamos reject
          reject(err);
        }
        // En caso de que todo este correcto retornamos resolve
        resolve(res.rows);
      });
    });
  }
}
