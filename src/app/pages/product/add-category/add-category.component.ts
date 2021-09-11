import { NgForm } from '@angular/forms';
import { CategoryService } from './../../../services/category.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  error: string;

  constructor(
    public route: Router,
    public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  //registra o actualiza categoría
  Register(form: NgForm) {
    form.value.active = true;
    if (form.value._id) {
      this.categoryService.updateCategory(form.value)
        .subscribe(res => {
          this.error = null;
          this.categoryService.selectedCategory = new Category();
          this.route.navigate(['product/categories']);
        },
          err => {
            this.error = err['error']['message'];
          })
    } else {
      this.categoryService.postCategory(form.value)
        .subscribe(res => {
          this.error = null;
          this.categoryService.selectedCategory = new Category();
          this.route.navigate(['product/categories']);
        },
          err => {
            this.error = err['error']['message'];
          })
    }
  }

}
