import { HttpClient } from '@angular/common/http';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  selectedCategory: Category;
  Categories: Category[];

  readonly URL = 'https://newappnode.herokuapp.com/api/category';

  constructor(private http: HttpClient) {
    this.selectedCategory = new Category();
  }

  getCategories() {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getCategoriesActive() {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/active/', {
      headers: {
        'x-access-token': token
      }
    });
  }


  getCategorybyId(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getCategoriesPaginated(page?: number) {
    if (!page) { page = 1 }
    const token = localStorage.getItem('x-access-token');
    return this.http.get(this.URL + '/paginated/' + page, {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateCategory(Category: Category) {
    const token = localStorage.getItem('x-access-token');
    return this.http.put(this.URL + `/${Category._id}`, Category, {
      headers: {
        'x-access-token': token
      }
    });
  }

  deleteCategory(_id: string) {
    const token = localStorage.getItem('x-access-token');
    return this.http.delete(this.URL + `/${_id}`, {
      headers: {
        'x-access-token': token
      }
    });
  }

  postCategory(category: Category) {
    const token = localStorage.getItem('x-access-token');
    return this.http.post(this.URL, category, {
      headers: {
        'x-access-token': token
      }
    });
  }

}
