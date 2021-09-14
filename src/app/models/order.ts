import { Product } from 'src/app/models/product';
export class Order {
  _id: string;
  userId: string;
  userName: string;
  products: Product[];
  quantity: number
  numorder: number;
  state: string;
  createdAt: Date;
}

