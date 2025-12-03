import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { VintedService } from './vinted.service';
import { HttpModule } from '@nestjs/axios';
import { ProductService } from './product.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsCronService } from './products.cron.service';
import { TokenCronService } from 'src/tokens/token.cron.service';
import { TokenService } from 'src/tokens/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/ProductEntity';
import { TokenEntity } from 'src/entities/TokenEntity';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ProductEntity, TokenEntity]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    VintedService,
    ProductService,
    ProductsCronService,
    TokenCronService,
    TokenService,
  ],
})
export class ProductsModule {}
