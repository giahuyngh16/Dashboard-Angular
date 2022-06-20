import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { PAGE_SIZE } from '@app-shared/constants/table.const';

import { PaginationModel } from '@app-shared/models/pagination-model';

@Component({
  selector: 'app-sts-pagination',
  templateUrl: './sts-pagination.component.html',
  styleUrls: ['./sts-pagination.component.scss']
})
export class StsPaginationComponent implements OnInit {
  @Input() paging: PaginationModel;

  @Output() pagingChange = new EventEmitter<PaginationModel>();

  PAGE_SIZE = PAGE_SIZE;

  constructor() {}

  ngOnInit(): void {}

  onChangePageSize() {
    this.paging.pageIndex = 1;
    this.paging.skip = this.paging.pageIndex > 1 ? (this.paging.pageIndex - 1) * this.paging.take : 0;

    this.pagingChange.emit(this.paging);
  }

  onChangePaging(pageIndex: number) {
    this.paging.pageIndex = pageIndex;
    this.paging.skip = this.paging.pageIndex > 1 ? (this.paging.pageIndex - 1) * this.paging.take : 0;

    this.pagingChange.emit(this.paging);
  }
}
