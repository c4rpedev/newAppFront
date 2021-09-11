import { SharedComponent } from './shared/shared.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SharedComponent, children: [
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path:'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
