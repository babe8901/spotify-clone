import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request: {
      user: User;
    },
  ) {
    return request.user;
  }
}
