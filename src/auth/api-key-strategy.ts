import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(private authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super();
  }

  async validate(apiKey: string): Promise<User> {
    const user = await this.authService.validateUserByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
