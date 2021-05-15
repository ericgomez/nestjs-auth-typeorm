import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard'; // Import Guards

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); // Utilizamos el servicio
  }

  @UseGuards(ApiKeyGuard) // Protegemos la ruta con el Guardian
  @Get('nuevo')
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
