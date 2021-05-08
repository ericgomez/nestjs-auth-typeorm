import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}
