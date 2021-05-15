import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata, // 👈 new decorator
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator'; // Traemos nuestro decorador personalizado

import { ApiKeyGuard } from './auth/guards/api-key.guard'; // Import Guards

@UseGuards(ApiKeyGuard) // Protegemos todas las rutas(endpoints) de toda la clase
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public() // Con esta forma, podemos centralizar la funcionalidad del decorador en un solo punto './auth/decorators/public.decorator'
  getHello(): string {
    return this.appService.getHello(); // Utilizamos el servicio
  }

  @Get('nuevo')
  @Public() // Con esta forma, podemos centralizar la funcionalidad del decorador en un solo punto './auth/decorators/public.decorator'
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
