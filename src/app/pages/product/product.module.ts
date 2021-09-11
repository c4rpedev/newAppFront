import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';

//imports
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListProductComponent, AddProductComponent, ListCategoryComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ]
})
export class ProductModule { }
