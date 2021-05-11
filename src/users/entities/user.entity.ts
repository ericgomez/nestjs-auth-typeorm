import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne, // 👈 new decorator
  JoinColumn, // 👈 new decorator
} from 'typeorm';

import { Customer } from './customer.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class User {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  email: string;

  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  password: string;

  @Column({ type: 'varchar', length: 100 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  role: string;

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

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  // Nota: El JoinColumn solo dede existir de deferencia de un lado ya sea en (user o costumer) No en dos
  @JoinColumn() // Crea la referencia al momento de enlazar y crear la llave foranea
  customer: Customer;
}
