import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');
  const config = new DocumentBuilder()
    .setTitle('TODO-APP')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT || 3000);
  Logger.log(
    `Server started running on ${await app.getUrl()}/api/v1`,
    'Bootstrap',
  );
}
bootstrap();
