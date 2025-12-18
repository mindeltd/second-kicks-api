import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/ProductEntity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>
  ) {}

  //   create(name: string) {
  //     const entity = this.repo.create({ name });
  //     return this.repo.save(entity);
  //   }

  async clearAndCreateMany(products: Partial<ProductEntity>[]) {
    let count = await this.repo.count();
    console.log('count before clear:', count);
    await this.repo.clear();
    count = await this.repo.count();
    console.log('count after clear:', count);
    const entities = this.repo.create(products);
    return this.repo.save(entities);
  }

  async findTopFavourites() {
    return this.repo
      .createQueryBuilder('product')
      .orderBy('product.favourite_count', 'DESC')
      .limit(100)
      .getMany();
  }

  findAll() {
    return this.repo.find();
  }
}
