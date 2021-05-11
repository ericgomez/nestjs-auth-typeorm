import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 👈 import
import { Repository } from 'typeorm'; // 👈 import

import { Product } from './../entities/product.entity';
import { Category } from './../entities/category.entity';
import { Brand } from './../entities/brand.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>, // 👈 Inject in Constructor
    @InjectRepository(Brand) private brandRepo: Repository<Brand>, // 👈 Inject in Constructor
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'], // Resolviendo con relaciones
    }); // 👈 use repo
  }

  // Cambiamos la funcion de manera asincrona para poder validar cuando un producto no fue encontrado
  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'], // Implementamos las relaciones para hacer un Join con las tables que se agregan al array
    }); // 👈 use repo
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
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
    // Validamos si existe brandId
    if (data.brandId) {
      // Obetenemos el brandId
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      // Obtenemos todas las categorias de puedan existir en un array
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      // Se las enviamos al nuevo producto
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct); // Guradamos en la base de datos
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id); // Obtenemos el producto a actualizar
    // Validamos si existe brandId
    if (changes.brandId) {
      // Obetenemos el brandId
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    // Con merge realizamos los cambio recibiendo: (Producto a actualizar, y los cambios que se tiene que aplicar)
    this.productRepo.merge(product, changes);

    return this.productRepo.save(product); // Guradamos en la base de datos
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
