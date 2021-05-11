import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

// Utilizamos ProductsModule que es el modulo exportado por products
import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]), // importamos el modulo de products para poder utilizarlo en users
  ],
  controllers: [CustomerController, UsersController, OrdersController, OrderItemController],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
})
export class UsersModule {}
