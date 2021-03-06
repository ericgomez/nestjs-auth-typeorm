import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { Product } from './entities/product.entity'; // Importamos la entidad de productos
import { Brand } from './entities/brand.entity'; // Importamos la entidad de brand
import { Category } from './entities/category.entity'; // Importamos la entidad de brand

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])], // 👈 Include entitites para administrar las entitites
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  // Nota: Como cada modulo es aislado podemos exporta un para que cualquier otro modulo lo pueda usar
  // en este caso lo exportamo para que lo pueda usar el modulo -> users
  exports: [ProductsService, TypeOrmModule], // Exportamos para que otros modulos puedan utilizar las entidades en otros modulos
})
export class ProductsModule {}
