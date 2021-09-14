import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Order } from './../models/order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  selectedOrder: Order;
  solds: Order[];
  totalSolds = 0;
  pages = 0;
  currentPage = 0;

  readonly URL = 'https://newappnode.herokuapp.com/api/order';

  constructor(private http: HttpClient,
    private productService: ProductService,
    private authService: AuthService) {
    this.selectedOrder = new Order();
  }

  getOrders() {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getOrdersByUser(page?: number) {
    if (!page) { page = 1 }
    var userid = this.authService.logedUser._id;
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/paginatedbyuser/' + page + '?userid=' + `${userid}`, {
      headers: {
        'x-access-token': token
      }
    });
  }


  getOrdersPaginated(page?: number) {
    if (!page) { page = 1 }
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/paginated/' + page, {
      headers: {
        'x-access-token': token
      }
    });
  }

  postOrder() {
    var order = {
      user: this.authService.logedUser._id,
      userName: this.authService.logedUser.name,
      products: this.productService.CarProducts
    };
    return this.http.post(this.URL, order);
  }

  deleteOrder(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.delete(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateOrder() {
    var Order = this.selectedOrder;
    const token = localStorage.getItem('x-access-token');
    return this.http.put(this.URL + `/${Order._id}`, Order, {
      headers: {
        'x-access-token': token
      }
    });
  }

}
