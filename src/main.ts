import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  //------------------------
  // global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,// transformacion en true
      transformOptions: {
        enableImplicitConversion: true//config para la transformacion implicita de la data
      }
    })
  )
  //global prefix:
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT);
  console.log(`App runnign on port ${process.env.PORT}`)
}
main();
