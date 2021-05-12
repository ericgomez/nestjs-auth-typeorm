import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, // 👈 new decorator
} from 'typeorm';

import { Product } from './product.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Brand {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  name: string;

  @Column({ type: 'varchar' }) // indicamos que sera una tabla y la columna sera de tipo varchar
  image: string;

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

  // El decorador OneToMany, solo sirve de referencia
  @OneToMany(() => Product, (product) => product.brand) // Relaciones uno a muchos
  products: Product[]; // Ponemos products en plural por que es un Array
}
