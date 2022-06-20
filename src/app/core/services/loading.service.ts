import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { APP_CONFIG } from '@app-core/constants/config.const';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  get loading(): Observable<boolean> {
    return this._isShowLoading$;
  }

  private _isShowLoading$ = new Subject<boolean>();
  private _isShowLoading = false;

  constructor() { }

  showLoading(): void {
    if (!this._isShowLoading) {
      this._isShowLoading = true;
      this._isShowLoading$.next(true);
    }
  }

  hideLoading(): void {
    setTimeout(() => {
      this._isShowLoading = false;
      this._isShowLoading$.next(false);
    }, APP_CONFIG.LOADING_TIME);
  }

  clearLoading(): void {
    this._isShowLoading = false;
    this._isShowLoading$.next(false);
  }
}
