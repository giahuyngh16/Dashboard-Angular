import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter, map } from 'rxjs/operators';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbResult: { url: string, navMenuLabel: string }[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _layoutService: LayoutService,
  ) { }

  ngOnInit() {
    this._trackRouterEvent();
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
