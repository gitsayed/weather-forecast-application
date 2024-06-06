

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { Action } from 'rxjs/internal/scheduler/Action';











@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {

  constructor(private router: Router,
    private tokenStorageService: TokenStorageService
    ) { }

  canActivate(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.tokenStorageService.getIsLoggedIn();
    const roles : string[] = route.data['roles'] ;

    if (isLoggedIn) {
      if (roles && roles.length > 0) {
        const userRoles :string[] = this.tokenStorageService.getCurrentUser().roles;
        const hasRequiredRole = userRoles.some(role => roles.includes(role));

        if (!hasRequiredRole) {
          
          this.router.navigate(['/invalid-access']);
          return false;
        }
        return true;
      }
      return true;
    
    } else {
    
      this.router.navigate(['/login']);
      return false;
    }
  }
}



// export const AuthGuard = () => {
//   const tokenStorageService = inject(TokenStorageService);
//   const router = inject(Router);
//   const route = inject(ActivatedRouteSnapshot);
//   const roles : string[] = route.data['roles'] ;

//   if (tokenStorageService.getIsLoggedIn()) {
//     if (roles && roles.length > 0) {
//       const userRoles :string[] = tokenStorageService.getUser().roles;
//       const hasRequiredRole = userRoles.some(role => roles.includes(role));

//       if (!hasRequiredRole) {
//         router.navigate(['/invalid-access']);
//         return false;
//       }
//       return true;
//     }
//     return true;
//   } else {
//     router.navigate(['/login'] , {queryParams:{action:'signin'}});
//     return false;
//   }
// };


export const AuthGuard: CanActivateFn = (route, state) => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);
  const roles : string[] = route.data['roles'] ;
  const token = localStorage.getItem('token');

  if (tokenStorageService.getIsLoggedIn()) {
    if (roles && roles.length > 0) {
      const userRoles :string[] = tokenStorageService.getCurrentUser().roles;
      const hasRequiredRole = userRoles.some(role => roles.includes(role));

      if (!hasRequiredRole) {
        router.navigate(['/invalid-access']);
        return false;
      }
      return true;
    }
    return true;
  } else {
    router.navigate(['/login'] , {queryParams:{action:'login'}});
    return false;
  }

};
