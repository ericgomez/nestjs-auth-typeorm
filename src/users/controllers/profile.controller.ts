import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard) // 👈 Agregamos nuestro Guardian extendido e implementamos otro nuevo Guardian, los ejecutara en el orden izquierda derecha
@ApiTags('profile') // 👈 Agregar un tag en la documentacion para separarlo por el grupo brands en swagger
@Controller('profile') // Repsenta el nombre del endpoint http://localhost:3000/profile/
export class ProfileController {
  // Realizamos la inyeccion de dependencias de OrdersService
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER) // indicamos que el unico que tiene acceso sera el rol de CUSTOMER podemos agregar mas roles con @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('my-orders') // http://localhost:3000/profile/my-orders
  getOrders(@Req() req: Request) {
    // Obtenemos del request el user, con la informacion de desincriptada
    const user = req.user as PayloadToken;
    // Ejecutamos la funcion del servicio de orders.service.ts
    return this.orderService.ordersByCustomer(user.sub);
  }
}
