import { ListClientProductComponent } from './list-client-product/list-client-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ListProductComponent } from './list-product/list-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'list',
        component: ListProductComponent
      },
      {
        path:'add',
        component: AddProductComponent
      },
      {
        path:'categories',
        component: ListCategoryComponent
      },
      {
        path:'add-categories',
        component: AddCategoryComponent
      },
      {
        path:'list-client-product',
        component: ListClientProductComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
