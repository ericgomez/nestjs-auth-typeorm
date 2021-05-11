import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Order {
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

  // Decorador pricipal es ManyToOne, Tiene la Foreign key
  @ManyToOne(() => Customer, (customer) => customer.orders) // Relaciones muchos a uno con products y es Bideirecional con Customer
  customer: Customer;

  // El decorador OneToMany, solo sirve de referencia
  @OneToMany(() => OrderItem, (item) => item.order) // Relaciones uno a muchos y es Bideirecional con OrderItem
  items: OrderItem[];
}
