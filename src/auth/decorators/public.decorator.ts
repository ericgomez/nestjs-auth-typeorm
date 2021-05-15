import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; // Creamos una valiables exportable

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // Creamos una funcion con arrow function, rnviando true por defecto
