export interface IFilterResponse<T> {
    result: T;
    skip: number;
    take: number;
    terms: string;
    total: number;
}