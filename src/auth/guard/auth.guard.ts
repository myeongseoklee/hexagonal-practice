/* eslint-disable @typescript-eslint/no-empty-function */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {} // private jwtService: JwtService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    const role = token === 'me' ? 'me' : 'user';

    request['user'] = role;

    return true;
  }
}
