import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

import { ROLES } from '../roles';
import { appRoutingsConfig } from '../routings';

@Injectable()
export class RedirectGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userLoggedInApp = this._authService.currentUserValue;
    if (!userLoggedInApp) {
      this._router.navigate([appRoutingsConfig.users.children.login.path]);
    }
    //const rolesCanAccessModule: string[] = route.routeConfig.data && route.routeConfig.data.roles || [];
    //const userRoles: string[] = userLoggedInApp && userLoggedInApp.profile && userLoggedInApp.profile.role || [];
    //const isCanAccess = userRoles.some(role => rolesCanAccessModule.includes(role));
    // if (!isCanAccess) {
    //     this._router.navigate([appRoutingsConfig.unauthorized.path]);
    //     return false;
    // }
    return !!userLoggedInApp;
  }
}
