import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne, // 👈 new decorator
  JoinColumn, // 👈 new decorator
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Customer } from './customer.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class User {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  email: string;

  @Exclude() // Excluimos el password de la respuesta desde cualquier consulta que nos llege ya sea desde Postman
  @Column({ type: 'varchar', length: 255 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  password: string;

  @Column({ type: 'varchar', length: 100 }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  role: string;

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

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  // Nota: El JoinColumn solo dede existir de deferencia de un lado ya sea en (user o costumer) No en dos
  @JoinColumn({
    // En las relaciones el nombramiento lo debe tener el parametro que tenga el JoinColumn
    name: 'customer_id', // Al momento de ser creada la tabla en la base de datos, tendra el nombre de 'customer_id' para su columna
  }) // Crea la referencia al momento de enlazar y crear la llave foranea
  customer: Customer;
}
