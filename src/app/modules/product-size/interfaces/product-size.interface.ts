import { PaginationModel } from "@app-shared/models/pagination-model";

export interface IProductSizeFilter extends PaginationModel{
  terms: string;
  sortBy: string;
  isDescending: boolean;
}

export interface IProductSize {
  id: number;
  name: string;
  quantity: number;
  size: number;
  idProductDetail: number;
}