import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { SeedService } from './seed/seed.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // You can enable seeding when you want
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
