import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

import { LoadingService } from '@app-core/services/loading.service';
import { AuthService } from '@app-core/services/auth.service';

import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { getMessageFromApiRequest } from '@app-core/helpers/error-message.utils';


@Injectable()
export class RequestResponseInterceptor implements HttpInterceptor {
  DEFAULT_MESSAGE = 'Something bad happened, please try again!';
  constructor(
    private _loadingService: LoadingService,
    private _authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      map(responseEvent => {
        if ((responseEvent instanceof HttpResponse) && !(responseEvent as HttpResponse<any>).body) {
          const cloneResponse = responseEvent.clone({
            body: {status: responseEvent.status}
          });
          return cloneResponse;
        }
        return responseEvent;
      }),
      catchError((err: HttpErrorResponse) => {
        if (Number(err.status) === 401) {
          this._authService.logout();
        }

        const error = err.error;
        const formatError: IRequestError = err && {
          status: err.status,
          statusText: err.statusText,
          elapsed: `${Date.now() - started}ms`,
          message: error && error.Message ? getMessageFromApiRequest(error.Message) : this.DEFAULT_MESSAGE
        };
        return throwError(formatError);
      }),
      finalize(() => this._loadingService.hideLoading())
    );
  }
}
