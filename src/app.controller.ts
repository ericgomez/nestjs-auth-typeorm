import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata, // 👈 new decorator
} from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard'; // Import Guards

@UseGuards(ApiKeyGuard) // Protegemos todas las rutas(endpoints) de toda la clase
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('isPublic', true) // Indicamos que el endpoint sera publico y No estara protegido por el guardian
  getHello(): string {
    return this.appService.getHello(); // Utilizamos el servicio
  }

  @Get('nuevo')
  @SetMetadata('isPublic', true) // Indicamos que el endpoint sera publico y No estara protegido por el guardian
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('tasks') // 👈 new endpoint
  tasks() {
    // Ejecutamos la funcion del servicio de app.service que es getTasks
    return this.appService.getTasks();
  }
}
