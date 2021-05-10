import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 👈 import
import { Repository } from 'typeorm'; // 👈 import

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>, // 👈 Inject
  ) {}

  findAll() {
    return this.productRepo.find(); // 👈 use repo
  }

  // Cambiamos la funcion de manera asincrona para poder validar cuando un producto no fue encontrado
  async findOne(id: number) {
    const product = await this.productRepo.findOne(id); // 👈 use repo
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    // Forma 1 - Declarando un por uno
    // const newProduct = new Product();
    // newProduct.name = data.image;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    // Forma 1 - Creando un instancia
    // De esta manera podemos instanciar de manera mas facil todos los elementos de un producto
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct); // Guradamos en la base de datos
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id); // Obtenemos el producto a actualizar
    // Con merge realizamos los cambio recibiendo: (Producto a actualizar, y los cambios que se tiene que aplicar)
    this.productRepo.merge(product, changes);

    return this.productRepo.save(product); // Guradamos en la base de datos
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
