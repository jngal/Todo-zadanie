import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

// import users from '../users.json';

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
  constructor(private jwtService: JwtService) {}

  signinLocal(dto: AuthDto) {
    // retrieve user
    // console.log(users);

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
  // signupLocal(dto: AuthDto) {
  //   return dto;
  // }
}
