import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductsService } from './products.service';

@Injectable()
export class ProductsCronService {
  constructor(private readonly productsService: ProductsService) {}

  // Run every minute
  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    await this.productsService.getItemsFromVintedAndSave();
  }
}
