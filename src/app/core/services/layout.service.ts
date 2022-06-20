import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Subject } from 'rxjs/internal/Subject';

import { IDynamicLabelMenu } from '../interfaces/dynamic-label-menu.interface';

@Injectable()
export class LayoutService {
  activatedRoute$ = new Subject<ActivatedRoute>();
  stateSidebar$ = new BehaviorSubject<boolean>(false);
  stateSidebarHover$ = new BehaviorSubject<boolean>(false);
  dynamicLabelMenu$ = new Subject<IDynamicLabelMenu>();
}
