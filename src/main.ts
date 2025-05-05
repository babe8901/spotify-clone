import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { SeedService } from './seed/seed.service';

declare const module: {
  hot: { accept: () => void; dispose: (callback: () => Promise<void>) => void };
};

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // You can enable seeding when you want
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port') as number);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

void bootstrap();
