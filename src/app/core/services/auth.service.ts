import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  private _currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;


  constructor(private _http: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this._currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this._http.post<any>(`${environment.apiHost}/api/Account/Login`, { email, password })
      .pipe(map(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const user = {...jwt_decode(response.data.accessToken) as IUser,  accessToken: response.data.accessToken} ;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUserSubject.next(user);
        return user;
      }));
  }

  getUserInfo(): IUser {
    return this._currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }

  // public async isManager(): Promise<boolean> {
  //   const user = await this._userManager.getUser();
  //   return user.profile.role.includes(ROLES.MANAGER);
  // }

  // public async isStaff(): Promise<boolean> {
  //   const user = await this._userManager.getUser();
  //   return user.profile.role.includes(ROLES.STAFF);
  // }

  // public async isShipper(): Promise<boolean> {
  //   const user = await this._userManager.getUser();
  //   return user.profile.role.includes(ROLES.SHIPPER);
  // }

  // public async isCustomer(): Promise<boolean> {
  //   const user = await this._userManager.getUser();
  //   return user.profile.role.includes(ROLES.CUSTOMER);
  // }

  // public async isAdmin(): Promise<boolean> {
  //   const user = await this._userManager.getUser();
  //   return user.profile.role.includes(ROLES.ADMIN);
  // }

  // public async isInAnyOfRoles(checkedRoles: string[]): Promise<boolean> {
  //   const user = await this._userManager.getUser();
  //   return user.profile.role.some(role => checkedRoles.includes(role));
  // }
}
