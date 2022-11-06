import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    /**
     * We must find out whether the user is authenticated or not. 
     * So we can return the status as we can derive it from our authService.
     */
    return this.authService.user.pipe(
      take(1),
      // user null veya değil'e göre bir kontrol yapıldı
      // null ise login/register sayfasına yönlendirildi
      map(user => { const isAuth = !!user; if(isAuth) { return true; } return this.router.createUrlTree(['/auth']); })
    );
  }

}
