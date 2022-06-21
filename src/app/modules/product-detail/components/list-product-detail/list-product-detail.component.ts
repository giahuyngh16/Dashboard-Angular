import { PRODUCT_DETAIL_KEY } from './../../constants/product-detail.const';
import { ProductDetailService } from './../../services/product-detail.service';
import { Component, OnInit } from '@angular/core';
import { ALIGNMENT_HEADER, PAGE_SIZE } from '@app-shared/constants/table.const';
import { ISortConfig, ISortOption } from '@app-shared/interfaces/sort.interface';
import { Subject } from 'rxjs';
import { ITableHeaderModel } from '@app-shared/interfaces/table-header.interface';
import { IProductDetail, IProductDetailFilter } from '@app-modules/product-detail/interfaces/product-detail.interface';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { PaginationModel } from '@app-shared/models/pagination-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTING_PATH } from '@app-core/routings';

@Component({
  selector: 'app-list-product-detail',
  templateUrl: './list-product-detail.component.html',
  styleUrls: ['./list-product-detail.component.scss']
})
export class ListProductDetailComponent implements OnInit {

  ALIGNMENT_HEADER = ALIGNMENT_HEADER;
  PAGE_SIZE = PAGE_SIZE;
  ROUTING_PATH = ROUTING_PATH;

  reset$ = new Subject<boolean>();

  sortOption: ISortOption = {
    id: { sortBy: 'id', isDescending: true, isDefault: true },
    name: { sortBy: 'name', isDescending: false, isDefault: false },
  };

  tableHeader: ITableHeaderModel<IProductDetail>[] = [
    { title: 'Id', width: '5%', alignment: 'center', sortValue: 'id' },
    { title: 'Name', width: '35%', sortValue: 'name' },
    { title: 'Price', width: '15%' },
    { title: 'Status', width: '15%' },
    { title: 'Type', width: '15%' },
    { title: 'Action', width: '5%' },
  ]

  filter: IProductDetailFilter = {
    terms: '',
    skip: 0,
    take: APP_CONFIG.PAGING_SIZE,
    total: 0,
    pageIndex: 1,
    isDescending: this.sortOption.name.isDescending,
    sortBy: this.sortOption.id.sortBy,
  };

  productDetailList: IProductDetail[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productDetailService: ProductDetailService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
  ) { }

  ngOnInit() {
    this._loadFilter();
    this._loadListProductDetail();
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
    this._loadListProductDetail();
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

    this._loadListProductDetail();
  }

  createProductDetail() {
    this._router.navigate(['create'], { relativeTo: this._activatedRoute });
  }

  private _loadListProductDetail() {
    this._productDetailService.getProductDetails(this.filter).subscribe(productDetail => {
      this.productDetailList = productDetail.data.result;
      this.filter.total = productDetail.data.total;
    });
  }

  private _saveFilter() {
    localStorage.setItem(PRODUCT_DETAIL_KEY, JSON.stringify(this.filter));
  }

  private _loadFilter() {
    const filter: IProductDetailFilter = JSON.parse(localStorage.getItem(PRODUCT_DETAIL_KEY));
    if (filter) {
      this.filter.terms = filter.terms;
    }
  }

}
