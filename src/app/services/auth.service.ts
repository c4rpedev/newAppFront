import { Role } from './../models/role';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logedUser: User;
  roles: Role[];

  readonly URL = 'https://newappnode.herokuapp.com/api/auth';


  constructor(public route: Router, private http: HttpClient) {
    this.logedUser = new User();
    this.roles = [];
  }

  login(User: User) {
    return this.http.post(this.URL + '/signin', User);
  }

  register(User: User) {
    return this.http.post(this.URL + '/signup', User);
  }

  //Devuelve un usuario dado un token
  findUser() {
    const token = localStorage.getItem("x-access-token");
    return this.http.post(this.URL + '/findUser', { token: token })
  }

  //verificar si el token es válido
  async check() {
    const token = localStorage.getItem("x-access-token");
    await this.http.post(this.URL + '/check', { token: token })
      .subscribe(res => {
        if (res['valid'] == true) {
          return true;
        }
      },
        err => {
          localStorage.clear();
          this.logedUser = new User();
          this.route.navigate(['/auth/login']);
          return false;
        })
  }

}
