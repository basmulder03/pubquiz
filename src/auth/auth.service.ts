import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithRoles } from 'prisma/userWithRoles';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    return AuthService.createJWToken(user, this.jwtService);
  }

  public static async createJWToken(
    user: UserWithRoles,
    jwtService: JwtService,
  ) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role.name,
      rights: user.role.rights.map((right) => right.name),
    };

    return {
      access_token: await jwtService.signAsync(payload),
    };
  }
}
