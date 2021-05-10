import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn, // 👈 new decorator
  UpdateDateColumn, // 👈 new decorator
} from 'typeorm';

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
}
