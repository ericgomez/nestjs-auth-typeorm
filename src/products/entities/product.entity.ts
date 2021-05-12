import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable, // 👈 new decorator and decorator main, crea la tabla terniaria
  Index, // 👈 new decorator
  JoinColumn, // 👈 new decorator
} from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' }) // Decorador indicamos que la clase sera una entidad y al momento de ser creada tendra el nombre de products
@Index(['price', 'stock']) // Forma1: Agregando indexadores de forma conjunta ejem: price y stock
export class Product {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // indicamos que sera una tabla y la columna sera de tipo varchar y el tamaño
  name: string;

  @Column({ type: 'text' }) // indicamos que sera una tabla y la columna sera de tipo text
  description: string;

  @Index() // Forma2: Agregando indexadores solo a price
  @Column({ type: 'int' }) // indicamos que sera una tabla y la columna sera de tipo int
  price: number;

  @Column({ type: 'int' }) // indicamos que sera una tabla y la columna sera de tipo int
  stock: number;

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

  // Decorador pricipal es ManyToOne, Tiene la Foreign key
  @ManyToOne(() => Brand, (brand) => brand.products) // Relaciones muchos a uno con products
  // En la relacion muchoa a uno agregamos JoinColumn al que tenga el decorador ManyToOne
  @JoinColumn({
    // En las relaciones el nombramiento lo debe tener el parametro que tenga el JoinColumn
    name: 'brand_id', // Al momento de ser creada la tabla en la base de datos, tendra el nombre de 'brand_id' para su columna
  })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products) // Relaciones muchos a muchos con Category, tambien indicamos en category.products estara la relacion
  // Para el caso de la tabla ternaria
  @JoinTable({
    // En las relaciones de las la tabla ternaria el nombramiento lo debe tener el parametro que tenga el JoinTable
    name: 'products_categories', // Al momento de ser creada la tabla ternaria en la base de datos, tendra el nombre de 'products_categories' para su columna
    // Nombramiento de los atributos internos de la tabla ternaria:
    joinColumn: {
      name: 'product_id', // como estamos situados en Product el primer nombre sera product_id
    },
    inverseJoinColumn: {
      name: 'category_id', // Sera el nombre de la relacion con la que estara Product, que en este caso es category
    },
  }) // Decorador principal necesario para la comunicacion muchos a muchos, solo debe de estar en un lado de la relacion (o en producto o en categorias)
  categories: Category[];
}
