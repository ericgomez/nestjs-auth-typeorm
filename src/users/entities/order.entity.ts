import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

import { Exclude, Expose } from 'class-transformer';

@Entity() // Decorador indicamos que la clase sera una entidad
export class Order {
  @PrimaryGeneratedColumn() // Decorador permite que una columna sea generada automáticamente
  id: number;

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
  @ManyToOne(() => Customer, (customer) => customer.orders) // Relaciones muchos a uno con products y es Bideirecional con Customer
  customer: Customer;

  @Exclude() // Decorador permite Excluir informacion en este caso: items
  // El decorador OneToMany, solo sirve de referencia
  @OneToMany(() => OrderItem, (item) => item.order) // Relaciones uno a muchos y es Bideirecional con OrderItem
  items: OrderItem[];

  @Expose() // Expose permite exponer y mostrar informacion y funciona con los gets
  get products() {
    // Validamos que items exista
    if (this.items) {
      // Retornamos el item transformado
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id, // Obtenemos el identificador como un parametro nuevo
        }));
    }
    // En caso que no entre en la condicion retornamos un array vacio
    return [];
  }

  @Expose() // Expose permite exponer y mostrar informacion y funciona con los gets
  // Calcular el total de las ordenes de compra
  get total() {
    // Validamos que items exista
    if (this.items) {
      // Retornamos el item transformado
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total + totalItem; // Obtenemos en total de todas las ordenes de compra
        }, 0);
    }

    // En caso que no entre en la condicion retornamos 0
    return 0;
  }
}
