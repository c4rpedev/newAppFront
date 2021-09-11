import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product;
  Products: Product[];

  readonly URL = 'https://newappnode.herokuapp.com/api/product';

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
  }

  getProducts() {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getProductbyId(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getProductPaginated(page?: number) {
    if (!page) { page = 1 }
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/paginated/' + page, {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateProduct(Product: Product) {
    const token = localStorage.getItem('x-access-token');
    return this.http.put(this.URL + `/${Product._id}`, Product, {
      headers: {
        'x-access-token': token
      }
    });
  }

  deleteProduct(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.delete(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  postProduct(product: Product) {
    const token = localStorage.getItem('x-access-token');
    return this.http.post(this.URL, product, {
      headers: {
        'x-access-token': token
      }
    });
  }

}
