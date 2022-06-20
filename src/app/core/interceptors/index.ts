import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderInterceptor } from './header.interceptor';
import { RequestResponseInterceptor } from './request-response.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequestResponseInterceptor, multi: true },
];
