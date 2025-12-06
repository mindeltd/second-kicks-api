import { Injectable } from '@nestjs/common';
import { VintedService } from './vinted.service';
import { Product } from 'src/models/product';
import { ProductService } from './product.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly vintedService: VintedService,
    private readonly productService: ProductService
  ) {}

  async getSortedItems(): Promise<Product[]> {
    return await this.productService.findTopFavourites();
  }

  async getItemsFromVintedAndSave() {
    const vintedProducts: Product[] = await this.vintedService.getItems();
    console.log(
      `5th item : ${vintedProducts[5].item_box.second_line} ${vintedProducts[5].price.amount} ${vintedProducts[5].id}`
    );
    await this.productService.clearAndCreateMany(vintedProducts);
  }
}
