import { ProductService } from './../../../services/product.service';
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

  constructor(
    public orderService: OrderService,
    public route: Router,
    public productService: ProductService) { }

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

    //limpiando datos
    this.productService.CarProducts = null;
    this.productService.totalCarProducts = 0;
    this.productService.precioTotCarProducts = 0;
    var precio = 0;
    var cant = 0;

    for (let index = 0; index < item.products.length; index++) {
      const producto = item.products[index];
      const cantidad = item.quantity[index];

      if (this.productService.CarProducts == null) {
        this.productService.CarProducts = [[producto, cantidad]]
        precio = producto.price * cantidad;
        cant = cantidad;
      } else {
        this.productService.CarProducts.push([producto, cantidad]);
        precio = precio + (producto.price * cantidad);
        cant = cant + cantidad;
      }
    }

    this.productService.totalCarProducts = cant;
    this.productService.precioTotCarProducts = precio;
    this.productService.editOrder = true;
    this.route.navigate(['/order/add']);
  }

  crear() {
    this.orderService.selectedOrder = new Order();
    this.route.navigate(['/product/list-client-product']);
  }

  precio(order: Order) {
    var precio = 0;
    for (let i = 0; i < order.products.length; i++) {
      precio = precio + (order.products[i].price * order.quantity[i]);
    }
    return precio;
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id)
      .subscribe(
        res => {
          this.getOrdersPaginated(this.currentPage);
        },
        err => console.log(err)
      )
  }

}
