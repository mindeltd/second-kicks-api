export type Product = {
  id: string;
  price: { amount: number };
  url: string;
  photo: { url: string };
  favourite_count: number;
  brand_title: string;
  item_box: { second_line: string };
};

// const products: Product[] = response.data.items.map(item => ({
//   id: item.id,
//   price: {
//     amount: item.price.amount,
//   },
//   url: item.url,
//   photo: {
//     url: item.photo.url,
//   },
//   favourite_count: item.favourite_count,
// }));
