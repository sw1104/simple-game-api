import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`🚀 Listening on Port ${PORT} 🚀`);
  });
}
bootstrap();
