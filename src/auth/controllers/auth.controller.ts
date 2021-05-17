import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { User } from './../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} // Realizamos la inyeccion AuthService en el constructor

  // Utilizamos guardian en especifico le indicamos el AuthGuard que tiene el nombre de la estrategia en local.strategy.ts
  // donde indicamos que la Strategy se llamara 'local' por lo que tenemos que llamarla de ma misma manera en el AuthGuard
  @UseGuards(AuthGuard('local'))
  // El metodo a llegar sera por Post
  @Post('login') //http://localhost:3000/auth/login
  // Obtengo el request de tipo Express con @req
  login(@Req() req: Request) {
    // Inidicamos que el resultado sera de tipo User
    const user = req.user as User;
    // Implementamo el metodo generateJWT que se encuentra en authService
    // el cual nos permite generar un token
    return this.authService.generateJWT(user);
  }
}
