import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from './customers.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  // Realizamos la inyeccion del motodo ProductsService
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client, // 👈 inject PG
    @InjectRepository(User) private userRepo: Repository<User>, // Injectamos la dependencia userRepo
    private customersService: CustomersService,
  ) {}

  findAll() {
    // Utilizo el servico para traer cualquier variable de .env
    const apiKey = this.configService.get('API_KEY'); // 👈 get API_KEY
    const dbName = this.configService.get('DATABASE_NAME'); // 👈 get DATABASE_NAME
    console.log(apiKey, dbName);
    return this.userRepo.find({
      relations: ['customer'], // Resolviendo la relacion de -> customer
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // Metodo para consultar un usuario por medio de su email
  findByEmail(email: string) {
    // Realizamos una consulta y obtenemos la primer coincidencia
    return this.userRepo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);

    // Encriptamos el password, en 10 iteracionaciones por medio de bcrypt
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword; // Asignamos el password

    // Validamos si existe el customerId
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      // Asignamos el nuevo customer
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    // 👈 new method
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
