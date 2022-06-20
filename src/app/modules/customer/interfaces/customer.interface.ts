import { PaginationModel } from "@app-shared/models/pagination-model";

export interface ICustomerFilter extends PaginationModel{
  terms: string;
  sortBy: string;
  isDescending: boolean;
}

export interface ICustomer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}
