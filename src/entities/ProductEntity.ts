import { Entity, PrimaryColumn, Column } from 'typeorm';

class Price {
  @Column('float')
  amount: number;
}

class Photo {
  @Column()
  url: string;
}

class ItemBox {
  @Column()
  second_line: string;
}

@Entity()
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column(() => Price)
  price: Price;

  @Column()
  url: string;

  @Column(() => Photo)
  photo: Photo;

  @Column({ default: 0 })
  favourite_count: number;

  @Column()
  brand_title: string;

  @Column(() => ItemBox)
  item_box: ItemBox;
}
