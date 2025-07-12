import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });


  app.useGlobalPipes(new ValidationPipe()); 

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

   const config = new DocumentBuilder()
    .setTitle('Mi BOLSILLO')
    .setDescription('API para la gestión de Mi Bolsillo.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); 
    await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
