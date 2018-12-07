import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data.expectedRole;
    const userRole = this.authService.getRole();
     console.log("expectedRole:::::::::::::::::::" ,expectedRole);
     console.log("userRole:::::::::::::::::::" ,userRole);
    if (this.authService.isLoggedIn) {
      if (expectedRole == userRole) {
        return true;
      } else {
        alert("Admin only can permit!!");
        this.route.navigate(['/home']);
        return false;
      }

    } else {
      alert("Please login");
      this.route.navigate(['/home']);
      return false;
    }

  }
}
