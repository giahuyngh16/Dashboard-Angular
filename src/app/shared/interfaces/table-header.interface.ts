export type AlignmentHeader = 'left' | 'center' | 'right';

export interface ITableHeaderModel<T> {
    title: string;
    sortValue?: keyof T;
    isDescending?: boolean;
    isDefault?: boolean;
    alignment?: AlignmentHeader;
    isRequired?: boolean;
    isCheckbox?: boolean;
    isExtraDesc?: boolean;
    class?: string;
    width?: string;
}
