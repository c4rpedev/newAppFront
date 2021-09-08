import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  Users: User[];

  readonly URL = 'https://newappnode.herokuapp.com/api/user';

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  getUsers() {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getUserbyId(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getUsersPaginated(page?: number) {
    if (!page) { page = 1 }
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/paginated/' + page, {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateUser(User: User) {
    const token = localStorage.getItem('x-access-token');
    return this.http.put(this.URL + `/${User._id}`, User, {
      headers: {
        'x-access-token': token
      }
    });
  }

  deleteUser(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.delete(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

}
