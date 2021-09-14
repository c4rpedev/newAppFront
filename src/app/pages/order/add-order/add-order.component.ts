import { AuthService } from './../../../services/auth.service';
import { OrderService } from './../../../services/order.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  products = [new Product()];
  cantProducts = 0;

  constructor(
    public productService: ProductService,
    public route: Router,
    public orderService: OrderService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  up(product: Product) {
    for (let index = 0; index < this.productService.CarProducts.length; index++) {
      const element = this.productService.CarProducts[index];
      if (product._id == element[0]._id) {
        if (element[1] < element[0].amount) {
          element[1] = element[1] + 1;
          this.upValues(product);
        }
        index = this.productService.CarProducts.length;
      }
    }
  }

  down(product: Product) {
    for (let index = 0; index < this.productService.CarProducts.length; index++) {
      const element = this.productService.CarProducts[index];
      if (product._id == element[0]._id) {
        if (element[1] > 1) {
          element[1] = element[1] - 1;
        } else {
          this.productService.CarProducts.splice(index, 1);
        }
        this.downValues(product);
        index = this.productService.CarProducts.length;
      }
    }
  }

  upValues(item: Product) {
    var price = item.price;
    this.productService.totalCarProducts = this.productService.totalCarProducts + 1;
    this.productService.precioTotCarProducts = this.productService.precioTotCarProducts + price;
  }

  downValues(item: Product) {
    var price = item.price;
    this.productService.totalCarProducts = this.productService.totalCarProducts - 1;
    this.productService.precioTotCarProducts = this.productService.precioTotCarProducts - price;
  }

  deleteProductCart(product: Product) {
    var price = product.price;
    for (let index = 0; index < this.productService.CarProducts.length; index++) {
      const element = this.productService.CarProducts[index];
      if (product._id == element[0]._id) {
        this.productService.CarProducts.splice(index, 1);
        index = this.productService.CarProducts.length;

        this.productService.totalCarProducts = this.productService.totalCarProducts - element[1];
        this.productService.precioTotCarProducts = this.productService.precioTotCarProducts - (price * element[1]);
      }
    }
  }

  buy() {
    this.orderService.postOrder()
      .subscribe(res => {
        for (let index = 0; index < this.productService.CarProducts.length; index++) {
          const element = this.productService.CarProducts[index];
          element[0].amount = element[0].amount - element[1];
          this.productService.updateProduct(element[0])
            .subscribe()
        }
        this.productService.CarProducts.splice(0);
        this.productService.totalCarProducts = 0;
        this.productService.precioTotCarProducts = 0;
        this.route.navigate(['/order']);
      });
  }

  editOrder(form: NgForm) {
    this.orderService.updateOrder()
      .subscribe(res => {
        this.orderService.selectedOrder = new Order();
        this.productService.CarProducts.splice(0);
        this.productService.totalCarProducts = 0;
        this.productService.precioTotCarProducts = 0;
        this.route.navigate(['/order']);
      })
  }

}
