import { HttpClient } from '@angular/common/http';
import { Role } from './../models/role';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  selectedRole: Role;
  Roles: Role[];

  readonly URL = 'https://newappnode.herokuapp.com/api/role';

  constructor(private http: HttpClient) {
    this.selectedRole = new Role();
  }

  getRoles() {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL, {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateRol(Rol: Role) {
    return this.http.put(this.URL + `/${Rol._id}`, Rol);
  }

  deleteRol(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.delete(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  postRol(Rol: Role) {
    const token = localStorage.getItem('x-access-token');
    return this.http.post(this.URL, Rol, {
      headers: {
        'x-access-token': token
      }
    });
  }
}
