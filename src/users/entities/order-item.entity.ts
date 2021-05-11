import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class OrderItem {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  // 👈 Implement decorator
  @CreateDateColumn({
    type: 'timestamptz', // Creamos el tipo de dato timestamp y agregamos tz para que el mismo ordene su zona horaria
    default: () => 'CURRENT_TIMESTAMP', // Este paso nos ayuda a no tener que insertar el valor, si no que lo hace automaticamente
  })
  createAt: Date;

  // 👈 Implement decorator
  @UpdateDateColumn({
    type: 'timestamptz', // Creamos el tipo de dato timestamp y agregamos tz para que el mismo ordene su zona horaria
    default: () => 'CURRENT_TIMESTAMP', // Este paso nos ayuda a no tener que insertar el valor, si no que lo hace automaticamente
  })
  updateAt: Date;

  @Column({ type: 'int' }) // indicamos que sera una tabla y la columna sera de tipo entero
  quantity: number;

  // Decorador pricipal es ManyToOne, Tiene la Foreign key
  @ManyToOne(() => Product) // Relaciones muchos a uno con products y NO bidireccional
  product: Product;

  // Decorador pricipal es ManyToOne, Tiene la Foreign key
  @ManyToOne(() => Order, (order) => order.items) // Decorador pricipal es ManyToOne, Tiene la Foreign key y es bidireccional con Order
  order: Order;
}
