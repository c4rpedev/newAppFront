import { Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-client-product',
  templateUrl: './list-client-product.component.html',
  styleUrls: ['./list-client-product.component.css']
})
export class ListClientProductComponent implements OnInit {

  productA = [new Product()];
  productB = [new Product()];
  productC = [new Product()];
  showProducts = [[new Product()]];
  products: Product[];
  currentPage: number;
  nextpage: number;
  beforepage: number;
  pages: number;

  constructor(public productService: ProductService, public route: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.cleanOrder();
  }

  //Limpiando datos de la orden
  cleanOrder() {
    if (this.productService.editOrder) {
      this.productService.CarProducts = null;
      this.productService.totalCarProducts = 0;
      this.productService.precioTotCarProducts = 0;
      this.productService.editOrder = false;
    }
  }

  // Datos de la tabla
  getProducts(page?: number) {
    this.productA = [new Product()];
    this.productB = [new Product()];
    this.productC = [new Product()];
    this.showProducts = [[new Product()]];

    if (!page) { page = 1; }
    this.productService.getProductPaginatedActive(page)
      .subscribe(res => {
        this.products = res['product'] as Product[];
        this.pages = res['pages'];
        this.currentPage = res['current'];

        this.beforepage = this.currentPage - 1;
        this.nextpage = this.beforepage + 2;

        for (let index = 0; index < this.products.length; index++) {

          if (index == 0) {
            this.productA[0] = (this.products[index]);
          }
          if (index == 1) {
            this.productB[0] = (this.products[index]);
          }
          if (index == 2) {
            this.productC[0] = (this.products[index]);
          }
          if (((index == 3) || (index == 6))) {
            this.productA.push(this.products[index]);
          }
          if (((index == 4) || (index == 7))) {
            this.productB.push(this.products[index]);
          }
          if (((index == 5) || (index == 8))) {
            this.productC.push(this.products[index]);
          }
        }
        if (this.productA[0]._id) { this.showProducts[0] = (this.productA) };
        if (this.productB[0]._id) { this.showProducts.push(this.productB) };
        if (this.productC[0]._id) { this.showProducts.push(this.productC) };
      });
  }


  addProduct(cantidad: HTMLInputElement, item: Product) {
    if (cantidad.value && parseFloat(cantidad.value) > 0) {
      var cant = parseFloat(cantidad.value);
    } else {
      var cant = 1;
    }

    var existe = false;
    var idProd = item._id;
    var success = false;
    var price = item.price

    if (cant <= item.amount) {
      //verificar si el carrito está vacío
      if (this.productService.CarProducts == null) {
        this.productService.CarProducts = [[item, cant]]
        success = true;
      } else {
        //verificar si ya está el producto en el carrito
        for (let index = 0; index < this.productService.CarProducts.length; index++) {
          if (this.productService.CarProducts[index][0]._id == idProd) {
            existe = true;
            if (this.productService.CarProducts[index][1] + cant <= item.amount) {
              this.productService.CarProducts[index][1] = this.productService.CarProducts[index][1] + cant;
              success = true;
            } else {
              console.log("No hay más de ese producto en el Almacén!!")
            }
            index = this.productService.CarProducts.length;
          }
        }
        if (!existe) {
          this.productService.CarProducts.push([item, cant]);
          success = true;
        }
      }
      if (success) {
        this.productService.totalCarProducts = this.productService.totalCarProducts + cant;
        this.productService.precioTotCarProducts = this.productService.precioTotCarProducts + (price * cant);
      }
    } else {
      console.log("No hay más de ese producto en el Almacén")
    }
  }

}
