import { NgForm } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { Role } from './../../../models/role';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles: Role[]
  error: string;

  constructor(public roleService: RoleService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles()
      .subscribe(
        res => {
          this.roles = res as Role[];
        },
        err => {
          console.log(err)
        }
      );
  };

  Add(form: NgForm) {
    console.log(form.value);
    this.roleService.postRol(form.value)
      .subscribe(
        res => {
          this.roleService.selectedRole = new Role();
          this.error = null;
          this.getRoles();
        },
        err => {
          this.error = err['error']['message'];
        }
      )}

  delete(id: string) {
    this.roleService.deleteRol(id)
      .subscribe(
        res => {
          this.getRoles();
        },
        err => {
          this.error = err['error']['message'];
        }
      )}

}
