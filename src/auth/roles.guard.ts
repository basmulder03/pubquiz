import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Right } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import type { UserWithRoles } from '../../prisma/userWithRoles';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRights = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRights) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = AuthGuard.extractTokenFromheader(req);
    let payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    const user: UserWithRoles = await this.usersService.findById(payload.sub);
    if (user.role.rights.length != payload.rights.length) {
      const newJwt = await AuthService.createJWToken(user, this.jwtService);
      payload = await this.jwtService.verifyAsync(newJwt.access_token, {
        secret: jwtConstants.secret,
      });
    }

    req['user'] = payload;
    return requiredRights.some((right) =>
      user.role?.rights.map((right: Right) => right.name).includes(right),
    );
  }
}
