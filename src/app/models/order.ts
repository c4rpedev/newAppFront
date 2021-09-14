import { Product } from 'src/app/models/product';
export class Order {
  _id: string;
  userId: string;
  products: Product[];
  quantity: number
  numorder: number;
  state: string;
  createdAt: Date;
}

