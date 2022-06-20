import { IUser } from './user/interfaces/user.interface';
import { Component } from '@angular/core';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { LayoutService } from '@app-core/services/layout.service';
import { LoadingService } from '@app-core/services/loading.service';
import { AuthService } from '@app-core/services/auth.service';

import { APP_CONFIG } from '@app-core/constants/config.const';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed: boolean;
  isShowLoading = false;

  currentUser: IUser;

  constructor(
    private _loadingService: LoadingService,
    private _layoutService: LayoutService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._authService.currentUser.subscribe(user=> this.currentUser = user);
    this._trackingLoading();
    combineLatest([this._layoutService.stateSidebar$, this._layoutService.stateSidebarHover$]).subscribe(([isOpen, isHover]) =>
      this.isCollapsed = isOpen && !isHover
    );
  }

  private _trackingLoading(): void {
    this._loadingService.loading.pipe(debounceTime(APP_CONFIG.LOADING_TIME), distinctUntilChanged()).subscribe(isShowLoading => this.isShowLoading = !!isShowLoading);
  }
}
