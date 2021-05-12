import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne, // 👈 new decorator
  OneToMany, // 👈 new decorator
} from 'typeorm';

import { User } from './user.entity';
import { Order } from './order.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Customer {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  name: string;

  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  lastName: string;

  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  phone: string;

  // 👈 Implement decorator
  @CreateDateColumn({
    name: 'create_at', // Al momento de ser creada la tabla en la base de datos, tendra el nombre de 'create_at' para su columna
    type: 'timestamptz', // Creamos el tipo de dato timestamp y agregamos tz para que el mismo ordene su zona horaria
    default: () => 'CURRENT_TIMESTAMP', // Este paso nos ayuda a no tener que insertar el valor, si no que lo hace automaticamente
  })
  createAt: Date;

  // 👈 Implement decorator
  @UpdateDateColumn({
    name: 'update_at', // Al momento de ser creada la tabla en la base de datos, tendra el nombre de 'update_at' para su columna
    type: 'timestamptz', // Creamos el tipo de dato timestamp y agregamos tz para que el mismo ordene su zona horaria
    default: () => 'CURRENT_TIMESTAMP', // Este paso nos ayuda a no tener que insertar el valor, si no que lo hace automaticamente
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, { nullable: true }) // Especificamos desde la tabla de user quien tiene la referencia de customer
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
