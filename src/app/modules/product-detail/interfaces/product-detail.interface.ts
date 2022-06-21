import { PaginationModel } from "@app-shared/models/pagination-model";

export interface IProductDetailFilter extends PaginationModel{
  terms: string;
  sortBy: string;
  isDescending: boolean;
}

export interface IProductDetail {
  id: number;
  name: string;
  price: number;
  basePrice: number;
  status: string;
  description: string;
  type: string;
  pic1: string;
  pic2: string;
  pic3: string;
}
