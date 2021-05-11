import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Category {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  name: string;

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
