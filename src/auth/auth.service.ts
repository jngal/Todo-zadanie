import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const users = require('../users.json');
const users = [
  {
    id: 1,
    email: 'vlad@gmail.com',
    password: '123',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  //login user stored in mongoDB
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        username: user.email,
      }),
    };
  }

  //signinLocal from local users.json
  signinLocal(dto: AuthDto) {
    const user = users.find((_user) => _user.email === dto.email);
    if (!user) throw new UnauthorizedException('Credentials incorrect');
    if (user.password !== dto.password) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    return this.singUser(user.id, user.email, 'user');
  }

  singUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
  }
}
