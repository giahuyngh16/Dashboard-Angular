import { ICustomer, ICustomerFilter } from './../../interfaces/customer.interface';
import { Component, OnInit } from '@angular/core';

import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

import { ALIGNMENT_HEADER, PAGE_SIZE } from '@app-shared/constants/table.const';
import { DATE_FORMAT } from '@app-shared/constants/date.const';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { ITableHeaderModel } from '@app-shared/interfaces/table-header.interface';
import { Subject } from 'rxjs';
import { ISortConfig, ISortOption } from '@app-shared/interfaces/sort.interface';
import { CUSTOMER_KEY } from '@app-modules/customer/constants/customer.const';
import { CustomersService } from '@app-modules/customer/services/customer.service';
import { PaginationModel } from '@app-shared/models/pagination-model';


@Component({
  selector: 'app-list-customers',
  templateUrl: 'list-customers.component.html',
  styleUrls: ['list-customers.component.scss']
})

export class ListCustomersComponent implements OnInit {

  ALIGNMENT_HEADER = ALIGNMENT_HEADER;
  DATE_FORMAT = DATE_FORMAT;
  PAGE_SIZE = PAGE_SIZE;

  reset$ = new Subject<boolean>();

  sortOption: ISortOption = {
    id: { sortBy: 'id', isDescending: true, isDefault: true },
    fullName: { sortBy: 'name', isDescending: false, isDefault: false },
  };

  tableHeader: ITableHeaderModel<ICustomer>[] = [
    { title: 'Id', width: '5%', alignment: 'center', sortValue: 'id' },
    { title: 'Name', width: '10%', sortValue: 'fullName' },
    { title: 'Email', width: '15%' },
    { title: 'PhoneNumber', width: '20%' },
    { title: 'Adress', width: '20%' },
  ]

  filter: ICustomerFilter = {
    terms: '',
    skip: 0,
    take: APP_CONFIG.PAGING_SIZE,
    total: 0,
    pageIndex: 1,
    isDescending: this.sortOption.fullName.isDescending,
    sortBy: this.sortOption.id.sortBy,
  };

  customerList: ICustomer[];

  constructor(
    private _customerService: CustomersService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
  ) { }

  ngOnInit() {
    this._loadFilter();
    this._loadListCustomer();
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
    this._loadListCustomer();
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

    this._loadListCustomer();
  }

  private _loadListCustomer() {
    this._customerService.getCustomers(this.filter).subscribe(customer => {
      this.customerList = customer.data.result;
      this.filter.total = customer.data.total;
    });
  }

  private _saveFilter() {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(this.filter));
  }

  private _loadFilter() {
    const filter: ICustomerFilter = JSON.parse(localStorage.getItem(CUSTOMER_KEY));
    if (filter) {
      this.filter.terms = filter.terms;
    }
  }
}
