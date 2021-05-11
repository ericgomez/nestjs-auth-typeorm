import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { OrderItem } from './../entities/order-item.entity';
import { Product } from './../../products/entities/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>, // Injectamos la dependencia orderRepo
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>, // Injectamos la dependencia itemRepo
    @InjectRepository(Product) private productRepo: Repository<Product>, // Injectamos la dependencia productRepo
  ) {}

  async create(data: CreateOrderItemDto) {
    // Veficamos la orden de compra
    const order = await this.orderRepo.findOne(data.orderId);
    // Verificamos el producto
    const product = await this.productRepo.findOne(data.productId);
    // Creamos una nuevo Objecto de OrderItem
    const item = new OrderItem();

    // Este item estara relacionado a cada dato
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    // Guardamos el item
    return this.itemRepo.save(item);
  }
}
