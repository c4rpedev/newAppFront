import { Router } from '@angular/router';
import { Order } from './../../../models/order';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

    currentPage: number;
    pages: number;
    orders: Order[];

    constructor(public orderService: OrderService, public route: Router) { }

    ngOnInit(): void {
      this.getOrdersPaginated();
    }

    // Datos de la tabla
    getOrdersPaginated(page?: number) {
      if (!page) { page = 1; }
      this.orderService.getOrdersPaginated(page)
        .subscribe(res => {
          this.orders = res['order'] as Order[];
          this.pages = res['pages'];
          this.currentPage = res['current'];
        },
          err => {
            console.log(err + '<--error')
          });
    }

    edit(item: Order) {
      this.orderService.selectedOrder = item;
      this.route.navigate(['/order/add']);
    }

    crear() {
      this.orderService.selectedOrder = new Order();
      this.route.navigate(['/product/list-client-product']);
    }

    precio(order: Order){
      var precio = 0;
      for(let i = 0; i < order.products.length; i++){
        precio = precio + (order.products[i].price * order.quantity[i]);
      }
      return precio;
    }

  }
