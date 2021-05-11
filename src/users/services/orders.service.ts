import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { Customer } from './../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      // Implamentamos el JOIN en Nest
      relations: ['items', 'items.product'], // Resolviendo la relacion de -> items y items.product
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    // Creamos una nueva instancia de Order
    const order = new Order();
    // Validamos si existe el customerId
    if (data.customerId) {
      // buscamos el existe el customerId
      const customer = await this.customerRepo.findOne(data.customerId);
      // agregamos customer a la order
      order.customer = customer;
    }
    // Guardamos en orderRepo
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    // buscamos el existe el Order
    const order = await this.orderRepo.findOne(id);
    // Validamos si existe el customerId
    if (changes.customerId) {
      // buscamos el existe el customerId
      const customer = await this.customerRepo.findOne(changes.customerId);
      // agregamos customer a la order
      order.customer = customer;
    }
    // Guardamos
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
