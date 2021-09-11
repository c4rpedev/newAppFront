import { Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  currentPage: number;
  pages: number;
  products: Product[];

  constructor(public productService: ProductService, public route: Router) { }

  ngOnInit(): void {
    this.getProductsPaginated();
  }

  // Datos de la tabla
  getProductsPaginated(page?: number) {
    if (!page) { page = 1; }
    this.productService.getProductPaginated(page)
      .subscribe(res => {
        this.products = res['product'] as Product[];
        this.pages = res['pages'];
        this.currentPage = res['current'];
      },
        err => {
          console.log(err + '<--error')
        });
  }

  edit(item: Product) {
    this.productService.selectedProduct = item;
    this.route.navigate(['/product/add']);
  }

  crear() {
    this.productService.selectedProduct = new Product();
    this.route.navigate(['/product/add']);
  }

  habilitarProduct(product: Product) {
    product.state = true;
    this.productService.updateProduct(product)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  deshabilitarProduct(product: Product) {
    product.state = false;
    this.productService.updateProduct(product)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          this.getProductsPaginated(this.currentPage);
        },
        err => console.log(err)
      )
  }

}

