import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  public constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    if (!this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/login').then(null);
      return false;
    }
    return true;
  }

}
