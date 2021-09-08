import { AdminGuard } from './../../guards/admin.guard';
import { RoleComponent } from './role/role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'list',
        component: ListUserComponent
      },
      {
        path:'add',
        component: AddUserComponent
      },
      {
        path:'role',
        component: RoleComponent,
        canActivate:[AdminGuard]
      },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
