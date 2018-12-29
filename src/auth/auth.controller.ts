import { Body, Controller, ForbiddenException, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post()
  async login(@Body() body) {
    const session = await this.authService.createToken(body.username, body.password);
    if (session && session.error) {
      throw new ForbiddenException();
    }
    return session;
  }
}
