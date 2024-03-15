import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting NestJS server... 🚀🚀🚀 ');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Biscuit Project')
    .setDescription('Biscuit project REST API documentation')
    .setVersion('1.0.0')
    .addTag('Biscuit project documentation')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
