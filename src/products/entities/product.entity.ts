import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany, // 👈 new decorator
  JoinTable, // 👈 new decorator and decorator main, crea la tabla terniaria
} from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Product {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  name: string;

  @Column({ type: 'text' }) // indicamos que sera una tabla y la columna sera de tipo text
  description: string;

  @Column({ type: 'int' }) // indicamos que sera una tabla y la columna sera de tipo int
  price: number;

  @Column({ type: 'int' }) // indicamos que sera una tabla y la columna sera de tipo int
  stock: number;

  @Column({ type: 'varchar' }) // indicamos que sera una tabla y la columna sera de tipo varchar
  image: string;

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
  @ManyToOne(() => Brand, (brand) => brand.products) // Relaciones muchos a uno con products
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products) // Relaciones muchos a muchos con Category, tambien indicamos en category.products estara la relacion
  @JoinTable() // Decorador principal necesario para la comunicacion muchos a muchos, solo debe de estar en un lado de la relacion (o en producto o en categorias)
  categories: Category[];
}
