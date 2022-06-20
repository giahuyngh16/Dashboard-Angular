export interface IDictionaryItem {
    id: string;
    name: string;
    unsignedName?: string;
    value?: string;
    code?: string;
    text?: string;
    isSelected?: boolean;
    isActive?: boolean;
    valid?: boolean;
    data?: IDictionaryItem;
}
