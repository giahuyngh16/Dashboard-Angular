export interface ISortConfig {
    sortBy: string;
    isDefault: boolean;
    isDescending: boolean;
}
export interface ISortOption {
    [option: string]: ISortConfig;
}
