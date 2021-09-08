import { NgForm } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { UserService } from './../../../services/user.service';
import { AuthService } from './../../../services/auth.service';
import { Role } from './../../../models/role';
import { Router } from '@angular/router';
import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  correctCI = false;
  repeatpassword: any;
  error: string;
  //array todos los roles
  Roles: Role[];
  //array roles enteros
  registerRoles = [];
  //array nombre roles
  formRoles = [];

  constructor(
    public route: Router,
    public authService: AuthService,
    public userService: UserService,
    public rolService: RoleService) { }

  ngOnInit(): void {
    this.getRoles();
    this.saveRoles();
  }

  getRoles() {
    this.rolService.getRoles()
      .subscribe(res => {
        this.Roles = res as Role[];
      });
  }

  //en caso de editar un usuario se añaden sus roles al array
  saveRoles() {
    if (this.userService.selectedUser._id) {
      this.userService.selectedUser.roles.forEach(element => {
        this.registerRoles.push(element);
      });
    }
  }

  //verifica si el usuario posee un rol específico
  //se usa en la vista para señalar los roles del usuario
  verifyRol(rol: Role): Boolean {
    if (this.userService.selectedUser.roles) {
      for (let index = 0; index < this.userService.selectedUser['roles'].length; index++) {
        const element = this.userService.selectedUser['roles'][index];
        if (element['_id'] == rol._id) {
          return true;
        }
      }
    }
    return false
  }

  //añade o elimina del array el rol seleccionado
  userRol(rol: Role) {
    let roleNotIn = true;
    for (let index = 0; index < this.registerRoles.length; index++) {
      const element = this.registerRoles[index];
      if (rol._id == element._id) {
        this.registerRoles.splice(index, 1)
        roleNotIn = false;
      }
    }
    if (roleNotIn) {
      this.registerRoles.push(rol);
    }
    this.userService.selectedUser.roles = this.registerRoles;
    this.getRoles();
  }

  //registra o actualiza usuario
  Register(form: NgForm) {
    form.value.active = true;
    if (this.registerRoles.length > 0) {
      this.registerRoles.forEach(element => {
        this.formRoles.push(element.name);
      });
      form.value.roles = this.formRoles
    }
    if (form.value._id) {
      this.userService.updateUser(form.value)
        .subscribe(res => {
          this.error = null;
          this.userService.selectedUser = new User();
          this.route.navigate(['/user/']);
        },
          err => {
            this.error = err['error']['message'];
          })
    } else {
      this.authService.register(form.value)
        .subscribe(res => {
          this.error = null;
          this.userService.selectedUser = new User();
          this.route.navigate(['/user/']);
        },
          err => {
            this.error = err['error']['message'];
          })
    }
  }

  //verificar si es un CI real
  validarCI(form: NgForm) {
    if (form.value.CI) {
      let CI = form.value.CI.toString();
      if (CI.length != 11) {
        this.correctCI = true;
      } else {
        this.correctCI = false;
      }
    }
  }
}


