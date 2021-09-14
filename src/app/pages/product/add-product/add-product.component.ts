import { NgForm } from '@angular/forms';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from './../../../services/product.service';
import { Router } from '@angular/router';
import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public file: File;
  public photoSelected: string | ArrayBuffer;
  public newFile = false;

  error: string;
  //array Categorías
  Categories: Category[];
  select = true;

  constructor(
    public route: Router,
    public productService: ProductService,
    public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategoriesActive()
      .subscribe(res => {
        this.Categories = res as Category[];
      });
  }

  //registra o actualiza producto
  Register(form: NgForm) {
    if (form.value._id) {
      this.productService.updateProduct(form.value)
        .subscribe(res => {
          this.error = null;
          this.productService.selectedProduct = new Product();
          this.route.navigate(['/product/']);
        },
          err => {
            this.error = err['error']['message'];
          })
    } else {
      form.value.state = true;
      this.productService.postProduct(form.value, this.file)
        .subscribe(res => {
          this.error = null;
          this.productService.selectedProduct = new Product();
          this.photoSelected = null;
          this.route.navigate(['/product/']);
        },
          err => {
            this.error = err['error']['message'];
          })
    }
  }

  saveImg(event): any {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file)
      this.newFile = true;
    }
  }

  //elimina el primer valor del select en caso de editar un producto
  selectCat(){
    this.select = false;
  }

}
