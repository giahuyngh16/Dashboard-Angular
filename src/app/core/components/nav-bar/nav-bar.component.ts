
import { Component, OnInit, Inject } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { filter, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';

import { IProfile } from '../../interfaces/profile.interface';
import { IUser } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isOpenSidebar: boolean;
  profileImageUrl: string;
  userCurrentProfile: IUser;
  breadcrumbResult: any;
  iShowProfileBox = false;

  private _detailAppraisalUrl: string = 'appraisals/detail/routine';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _layoutService: LayoutService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._authService.currentUser.subscribe((user: IUser) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit() {
    this._trackRouterEvent();
    this._getCurrentUser();
    this._layoutService.stateSidebar$.subscribe(isOpen => (this.isOpenSidebar = isOpen));
  }

  toggleSidebar() {
    this._layoutService.stateSidebar$.next(!this.isOpenSidebar);
  }

  toggleProfileBox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.iShowProfileBox = !this.iShowProfileBox;
  }

  clickOut(isOutSide: boolean) {
    if (isOutSide) {
      this.iShowProfileBox = false;
    }
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['user/login']);
  }

  navigate(url: string): void {
    if (url === this._detailAppraisalUrl) {
      const arrayURL = this._router.url.split('/');
      arrayURL.splice(-1, 1);
      this._router.navigateByUrl(arrayURL.join('/'));
    } else {
      this._router.navigateByUrl(url);
    }
  }

  changePassword() {
    const changePasswordStr = environment.authoritySetting.authority + 'user/changePassword?email=' +
      (this.userCurrentProfile && this.userCurrentProfile.email || '');
    this._document.location.href = changePasswordStr;
  }

  private _getCurrentUser() {
    // this._authService.authUserLogin$.subscribe(user => {
    //   this.userCurrentProfile = user && user.profile;
    // });
  }

  private _trackRouterEvent() {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map(route => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        filter(route => !!route)
      )
      .subscribe((route: ActivatedRoute) => {
        this._layoutService.activatedRoute$.next(route);
        this.breadcrumbResult = route.routeConfig && route.routeConfig.data && route.routeConfig.data.breadcrumb || [];
      });
  }
}
