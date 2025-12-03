import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/ProductEntity';
import { TokenEntity } from './entities/TokenEntity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // the SQLite file
      entities: [ProductEntity, TokenEntity],
      synchronize: true, // automatically creates tables (good for dev, careful in prod)
    }),
    // TypeOrmModule.forFeature([ProductEntity, TokenEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
