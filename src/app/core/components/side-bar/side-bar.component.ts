import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { mergeMap } from 'rxjs/internal/operators/mergeMap';


import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';

import { SIDE_BARS } from '../../constants/layout.const';

import { IDynamicLabelMenu } from '../../interfaces/dynamic-label-menu.interface';
import { ISidebarMenu } from '../../interfaces/side-bar-menu.interface';
import { capitalizeWords } from '@app-core/helpers/sts-utils';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {
  sideBarMenu: ISidebarMenu;
  isCollapsedSideMenu: boolean;
  dynamicLabelMenu: IDynamicLabelMenu;

  constructor(
    private _router: Router,
    private _titleService: Title,
    private _authService: AuthService,
    private _layoutService: LayoutService,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit() {
    this.sideBarMenu = SIDE_BARS;
    this._layoutService.activatedRoute$
      .pipe(mergeMap(route => route.data))
      .subscribe(data => {
        const userLoginRoles = this._authService.currentUserValue ? this._authService.currentUserValue.role : '';
        this.sideBarMenu = this._cloneSideBarMenuAndCheckRole(SIDE_BARS, userLoginRoles);
        this._setTitle(data && data.breadcrumb);
      });
    this._layoutService.stateSidebar$.subscribe(isCollapsedSideMenu => (this.isCollapsedSideMenu = isCollapsedSideMenu));
    this._layoutService.dynamicLabelMenu$.subscribe(dynamicLabelMenu => this.dynamicLabelMenu = dynamicLabelMenu);


  }

  nzOpenChange(menu: ISidebarMenu): void {
    const subMenuDefault = Object.values(menu).find(subMenu => subMenu.isDisplayOnMenu);
    if (subMenuDefault && !this.isCollapsedSideMenu) {
      this._router.navigate([subMenuDefault.route]);
    }
  }

  private _setTitle(breadcrumb: any[]): void {
    const lastItem = breadcrumb && breadcrumb.length && [...breadcrumb].pop();
    const title = lastItem ? capitalizeWords(String(lastItem.navMenuLabel)) : '';
    this._titleService.setTitle(`Dream Store${title ? ` - ${title}` : ''}`);
  }

  private _cloneSideBarMenuAndCheckRole(initDefaultMenu: ISidebarMenu, userLoggedRole: string): ISidebarMenu {
    return Object.keys(initDefaultMenu).reduce((sideBarMenu: ISidebarMenu, currentMenuKey) => {
      sideBarMenu[currentMenuKey] = initDefaultMenu[currentMenuKey];
      sideBarMenu[currentMenuKey]['isOpenMenu'] = this._document.location.pathname.includes(sideBarMenu[currentMenuKey].route);
      sideBarMenu[currentMenuKey]['isDisplayOnMenu'] = sideBarMenu[currentMenuKey].roles === userLoggedRole;
      if (initDefaultMenu[currentMenuKey].children) {
        const isOpenMenu = Object.values(initDefaultMenu[currentMenuKey].children).map(child => child.route).some(childRoute => this._document.location.pathname.includes(childRoute));
        sideBarMenu[currentMenuKey]['isOpenMenu'] = isOpenMenu;
        sideBarMenu[currentMenuKey]['children'] = this._cloneSideBarMenuAndCheckRole(initDefaultMenu[currentMenuKey].children, userLoggedRole);
      }
      return sideBarMenu;
    }, {});
  }

  toggleSidebar() {
    this._layoutService.stateSidebar$.next(!this.isCollapsedSideMenu);
  }
}
