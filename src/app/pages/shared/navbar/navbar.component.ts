import { Role } from './../../../models/role';
import { ProductService } from './../../../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public route: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  //para obtener el usuario logueado cuando se actualiza la pag
  getUser() {
    if (!this.authService.logedUser._id) {
      this.authService.findUser()
        .subscribe(res => {
          this.authService.logedUser = res as User;
          this.authService.roles = res['roles'] as Role[];
        })
    }
  }

  logout() {
    localStorage.clear();
    this.authService.logedUser = new User();
    this.route.navigate(['/auth/login']);
  }

}
