import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  currentPage: number;
  pages: number;
  categories: Category[];

  constructor(public categoryService: CategoryService, public route: Router) { }

  ngOnInit(): void {
    this.getCategoriesPaginated();
  }

  // Datos de la tabla
  getCategoriesPaginated(page?: number) {
    if (!page) { page = 1; }
    this.categoryService.getCategoriesPaginated(page)
      .subscribe(res => {
        this.categories = res['category'] as Category[];
        this.pages = res['pages'];
        this.currentPage = res['current'];
      },
        err => {
          console.log(err + '<--error')
        });
  }

  edit(item: Category) {
    this.categoryService.selectedCategory = item;
    this.route.navigate(['/product/add-categories']);
  }

  crear() {
    this.categoryService.selectedCategory = new Category();
    this.route.navigate(['/product/add-categories']);
  }

  habilitarCategory(category: Category) {
    category.active = true;
    this.categoryService.updateCategory(category)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  deshabilitarCategory(category: Category) {
    category.active = false;
    this.categoryService.updateCategory(category)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id)
      .subscribe(
        res => {
          this.getCategoriesPaginated(this.currentPage);
        },
        err => console.log(err)
      )
  }

}
