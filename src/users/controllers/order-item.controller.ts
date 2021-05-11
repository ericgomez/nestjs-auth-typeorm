import { Controller, Post, Body } from '@nestjs/common';

import { CreateOrderItemDto } from './../dtos/order-item.dto';
import { OrderItemService } from './../services/order-item.service';

// Dentro de los Controllers atendemos todas las peticiones
@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {} // Injectamos la dependencia OrderItemService

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    // Ejecutamos la funcion que esta en order-item.service con el nombre: create
    return this.itemsService.create(payload);
  }
}
