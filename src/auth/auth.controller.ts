import { Body, Controller, ForbiddenException, Post} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post()
  async login(@Body() body) {
    const session = await this.authService.createToken(body.username, body.password);
    console.log(session);
    if (session && session.error) {
      throw new ForbiddenException();
    }
    return session;
  }
}
