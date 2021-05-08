import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Category {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  name: string;
}
