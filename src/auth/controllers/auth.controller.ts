import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // Utilizamos guardian en especifico le indicamos el AuthGuard que tiene el nombre de la estrategia en local.strategy.ts
  // donde indicamos que la Strategy se llamara 'local' por lo que tenemos que llamarla de ma misma manera en el AuthGuard
  @UseGuards(AuthGuard('local'))
  // El metodo a llegar sera por Post
  @Post('login') //http://localhost:3000/auth/login
  // Obtengo el request de tipo Express con @req
  login(@Req() req: Request) {
    return req.user;
  }
}
