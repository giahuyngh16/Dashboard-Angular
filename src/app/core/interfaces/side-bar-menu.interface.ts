export interface ISidebarMenu {
    [key: string]: IItemSidebarMenu;
}

export interface IItemSidebarMenu {
    image?: string;
    icon: string;
    route: string;
    isOpenMenu?: boolean;
    isDefaultOpen?: boolean;
    roles: string;
    children?: ISidebarMenu;
    isDisplayOnMenu?: boolean;
}
