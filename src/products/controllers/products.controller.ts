import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards, // 👈 new decorator
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // 👈
import { AuthGuard } from '@nestjs/passport'; // 👈

import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';

import { ProductsService } from './../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'; // importamos el guardian personalizado
import { RolesGuard } from '../../auth/guards/roles.guard'; // Importamos nuestro Guardian personalizado
import { Public } from '../../auth/decorators/public.decorator'; // Decorador que da metadata al endpoint
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard) // 👈 Agregamos nuestro Guardian extendido e implementamos otro nuevo Guardian, los ejecutara en el orden izquierda derecha
@ApiTags('products') // 👈 Agregar un tag en la docuemntacion para separarlo por el grupo products
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public() // Indicamos con este decorador Public y el Guradian que no quererira un token
  @Get()
  @ApiOperation({ summary: 'List of products' }) // 👈 Agregar una descripcion pequeña en el endpoint
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Public() // Indicamos con este decorador Public y el Guradian que no quererira un token
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN) // indicamos que el unico que tiene acceso sera el rol de administrador podemos agregar mas roles con @Roles(Role.ADMIN, Role.CUSTOMER)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id') id: number,
    // Nota: Tenemos que tener en cuenta que el valor que recibimos de un Query siempre es String por ende devemos convertilo con los PIPES
    @Param('categoryId', ParseIntPipe) categoryId: number, // Parseamos nuestro el valor de categoryId a un tipo entero con ParseIntPipe
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    // Nota: Tenemos que tener en cuenta que el valor que recibimos de un Query siempre es String por ende devemos convertilo con los PIPES
    @Param('categoryId', ParseIntPipe) categoryId: number, // Parseamos nuestro el valor de categoryId a un tipo entero con ParseIntPipe
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
