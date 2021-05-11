import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        // Si llega una cadena de caracteres que se puede representar en un numero lo va a convertir a numero de manera automatica
        enableImplicitConversion: true, // Habilitamos la conversion de forma implicita
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Abilitamos Cors que es una característica de seguridad del navegador que permite las solicitudes HTTP de origen cruzado.
  // Es decir pemite que acceden a las API alojadas en un dominio u origen distinto.
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
