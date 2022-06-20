import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '@app-core/services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authService.currentUserValue;

    const token = currentUser && currentUser.accessToken ? `Bearer ${currentUser.accessToken}` : '';
    const modifiedHeader = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(modifiedHeader);
  }
}
