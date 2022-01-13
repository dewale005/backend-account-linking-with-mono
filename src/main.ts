import { QueryErrorFilter } from './helpers/globalfilter';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  // const config = new DocumentBuilder()
  //   .setTitle('Account API')
  //   .setDescription('Mono Account Linking API')
  //   .setVersion('1.0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  // app.useGlobalFilters(new QueryErrorFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
