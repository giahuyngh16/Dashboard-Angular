import { STAFF_KEY } from './../../constants/staff.const';
import { StaffService } from './../../services/staff.service';
import { Component, OnInit } from '@angular/core';
import { ALIGNMENT_HEADER, PAGE_SIZE } from '@app-shared/constants/table.const';
import { ISortConfig, ISortOption } from '@app-shared/interfaces/sort.interface';
import { Subject } from 'rxjs';
import { ITableHeaderModel } from '@app-shared/interfaces/table-header.interface';
import { IStaff, IStaffFilter } from '@app-modules/staff/interfaces/staff.interface';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { PaginationModel } from '@app-shared/models/pagination-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss']
})
export class ListStaffComponent implements OnInit {

  ALIGNMENT_HEADER = ALIGNMENT_HEADER;
  PAGE_SIZE = PAGE_SIZE;

  reset$ = new Subject<boolean>();

  sortOption: ISortOption = {
    id: { sortBy: 'id', isDescending: true, isDefault: true },
    fullName: { sortBy: 'name', isDescending: false, isDefault: false },
  };

  tableHeader: ITableHeaderModel<IStaff>[] = [
    { title: 'Id', width: '5%', alignment: 'center', sortValue: 'id' },
    { title: 'Name', width: '10%', sortValue: 'fullName' },
    { title: 'Email', width: '15%' },
    { title: 'PhoneNumber', width: '20%' },
    { title: 'Adress', width: '20%' },
  ]

  filter: IStaffFilter = {
    terms: '',
    skip: 0,
    take: APP_CONFIG.PAGING_SIZE,
    total: 0,
    pageIndex: 1,
    isDescending: this.sortOption.fullName.isDescending,
    sortBy: this.sortOption.id.sortBy,
  };

  staffList: IStaff[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staffService: StaffService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
  ) { }

  ngOnInit() {
    this._loadFilter();
    this._loadListStaff();
  }

  ngOnDestroy() {
    this.reset$ && this.reset$.unsubscribe();
  }

  onSortBy(model: ISortConfig): void {
    this.filter.sortBy = model.sortBy;
    this.filter.isDescending = model.isDescending;

    this.onFilter();
  }

  onChangePaging(paging: PaginationModel) {
    this.filter.skip = paging.skip;
    this.filter.take = paging.take;
    this.filter.pageIndex = paging.pageIndex;
    this._loadListStaff();
  }

  reset() {
    this.filter.terms = '';
    this.reset$.next(true);
    this.onFilter();
  }

  onFilter() {
    this.filter.pageIndex = 1;
    this.filter.skip = 0;
    this._saveFilter();

    this._loadListStaff();
  }

  createStaff() {
    this._router.navigate(['create'], { relativeTo: this._activatedRoute });
  }

  private _loadListStaff() {
    this._staffService.getStaffs(this.filter).subscribe(staff => {
      this.staffList = staff.data.result;
      this.filter.total = staff.data.total;
    });
  }

  private _saveFilter() {
    localStorage.setItem(STAFF_KEY, JSON.stringify(this.filter));
  }

  private _loadFilter() {
    const filter: IStaffFilter = JSON.parse(localStorage.getItem(STAFF_KEY));
    if (filter) {
      this.filter.terms = filter.terms;
    }
  }

}
