import { AddOrderComponent } from './add-order/add-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'list',
        component: ListOrderComponent
      },
      {
        path:'add',
        component: AddOrderComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
