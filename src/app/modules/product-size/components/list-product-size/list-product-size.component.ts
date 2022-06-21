import { PRODUCT_SIZE_KEY } from './../../constants/product-size.const';
import { ProductSizeService } from './../../services/product-size.service';
import { Component, OnInit } from '@angular/core';
import { ALIGNMENT_HEADER, PAGE_SIZE } from '@app-shared/constants/table.const';
import { ISortConfig, ISortOption } from '@app-shared/interfaces/sort.interface';
import { Subject } from 'rxjs';
import { ITableHeaderModel } from '@app-shared/interfaces/table-header.interface';
import { IProductSize, IProductSizeFilter } from '@app-modules/product-size/interfaces/product-size.interface';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { PaginationModel } from '@app-shared/models/pagination-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTING_PATH } from '@app-core/routings';

@Component({
  selector: 'app-list-product-size',
  templateUrl: './list-product-size.component.html',
  styleUrls: ['./list-product-size.component.scss']
})
export class ListProductSizeComponent implements OnInit {

  ALIGNMENT_HEADER = ALIGNMENT_HEADER;
  PAGE_SIZE = PAGE_SIZE;
  ROUTING_PATH = ROUTING_PATH;

  reset$ = new Subject<boolean>();

  sortOption: ISortOption = {
    id: { sortBy: 'id', isDescending: true, isDefault: true },
    name: { sortBy: 'name', isDescending: false, isDefault: false },
  };

  tableHeader: ITableHeaderModel<IProductSize>[] = [
    { title: 'Id', width: '5%', alignment: 'center', sortValue: 'id' },
    { title: 'Name', width: '35%', sortValue: 'name' },
    { title: 'Size', width: '15%' },
    { title: 'Quantity', width: '15%' },
    { title: 'Action', width: '5%' },
  ]

  filter: IProductSizeFilter = {
    terms: '',
    skip: 0,
    take: APP_CONFIG.PAGING_SIZE,
    total: 0,
    pageIndex: 1,
    isDescending: this.sortOption.name.isDescending,
    sortBy: this.sortOption.id.sortBy,
  };

  productSizeList: IProductSize[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productSizeService: ProductSizeService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
  ) { }

  ngOnInit() {
    this._loadFilter();
    this._loadListProductSize();
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
    this._loadListProductSize();
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

    this._loadListProductSize();
  }

  createProductSize() {
    this._router.navigate(['create'], { relativeTo: this._activatedRoute });
  }

  private _loadListProductSize() {
    this._productSizeService.getProductSizes(this.filter).subscribe(productSize => {
      this.productSizeList = productSize.data.result;
      this.filter.total = productSize.data.total;
    });
  }

  private _saveFilter() {
    localStorage.setItem(PRODUCT_SIZE_KEY, JSON.stringify(this.filter));
  }

  private _loadFilter() {
    const filter: IProductSizeFilter = JSON.parse(localStorage.getItem(PRODUCT_SIZE_KEY));
    if (filter) {
      this.filter.terms = filter.terms;
    }
  }

}
