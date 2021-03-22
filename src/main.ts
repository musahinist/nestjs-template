import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filter/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('/api/v1');
  const config = new DocumentBuilder()
    .setTitle('TODO-APP')
    .setDescription('The template API description')
    .setVersion('1.0.0')
    // .addBearerAuth('Authorization', 'header')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT || 3000);
  Logger.log(
    `Server started running on: ${await app.getUrl()}/api/v1`,
    'Bootstrap',
  );
}
bootstrap();
