import { SetMetadata } from '@nestjs/common';

import { Role } from '../models/roles.model';

// Creamos una valiables exportable ROLES_KEY
export const ROLES_KEY = 'roles';

// Creamos una funcion con arrow function, enviando un array con los roles por defecto
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
