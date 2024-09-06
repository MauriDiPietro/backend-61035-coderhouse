import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().addBearerAuth()
    .setTitle('APP USERS CODER')
    .setDescription('Api Nest documentation')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)

  await app.listen(3000);
}
bootstrap();
