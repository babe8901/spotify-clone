import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PayloadType } from './auth/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  getProfile(
    @Req()
    request: {
      user: PayloadType;
    },
  ): PayloadType {
    return request.user;
  }
}
