import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public authService: AuthService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    for (let index = 0; index < this.authService.roles.length; index++) {
      const element = this.authService.roles[index];
      if (element.name == 'Administrador' || element.name == 'Super Administrador') {
        return true;
      }
    }

    this.route.navigate(['/auth/login']);
    return false;
  }

}
