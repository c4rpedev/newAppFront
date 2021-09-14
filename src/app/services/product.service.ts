import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product;
  Products: Product[];
  CarProducts: [[Product, number]];
  totalCarProducts = 0;
  precioTotCarProducts = 0;

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

  getProductPaginatedActive(page?: number) {
    if (!page) { page = 1 }
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/paginatedactive/' + page, {
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

  postProduct(Product: Product, file: File) {
    const fd = new FormData();
    fd.append('name', Product.name);
    fd.append('price', Product.price.toString());
    fd.append('cost', Product.cost.toString())
    fd.append('um', Product.um)
    fd.append('picture', file)
    fd.append('amount', Product.amount.toString())
    fd.append('state', Product.state.toString())
    fd.append('category', Product.category)
    const token = localStorage.getItem('x-access-token');
    return this.http.post(this.URL, fd, {
      headers: {
        'x-access-token': token
      }
    });
  }

}
