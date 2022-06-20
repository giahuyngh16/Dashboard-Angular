import { PaginationModel } from "@app-shared/models/pagination-model";

export interface IStaffFilter extends PaginationModel{
  terms: string;
  sortBy: string;
  isDescending: boolean;
}

export interface IStaff {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}

export interface IStaffForm {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  password: string;
}

export interface IStaffDetails {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}
