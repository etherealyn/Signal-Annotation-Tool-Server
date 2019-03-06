import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.enableCors({ origin: 'http://localhost:4200' });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
