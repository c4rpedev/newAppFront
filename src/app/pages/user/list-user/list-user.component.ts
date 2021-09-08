import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  currentPage: number;
  pages: number;
  users: User[];

  constructor(public userService: UserService, public route: Router) { }

  ngOnInit(): void {
    this.getUsersPaginated();
  }

  // Datos de la tabla
  getUsersPaginated(page?: number) {
    if (!page) { page = 1; }
    this.userService.getUsersPaginated(page)
      .subscribe(res => {
        this.users = res['user'] as User[];
        this.pages = res['pages'];
        this.currentPage = res['current'];
      },
      err => {
        console.log(err + '<--error')
      });
  }

  edit(item: User) {
    this.userService.selectedUser = item;
    this.route.navigate(['/user/add']);
  }

  crear() {
    this.userService.selectedUser = new User();
    this.route.navigate(['/user/add']);
  }

  habilitarUser(user: User) {
    user.active = true;
    this.userService.updateUser(user)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  deshabilitarUser(user: User) {
    user.active = false;
    this.userService.updateUser(user)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        res => {
          this.getUsersPaginated(this.currentPage);
        },
        err => console.log(err)
      )}

}
