import { IconName } from '@app-shared/components/sts-icon/icon-name';

interface INzIcon {
    type: string;
    theme: string;
}

interface ICheckboxDropdownConfig {
    isMultiple: boolean;
    isCloseWhenChosen: boolean;
    isAddNewWhenNotExist: boolean;
    isDisplaySelectedResult: boolean;
    isDisplaySelectedTag: boolean;
    isSearchMode: boolean;
    placeHolderSearchBox: string;
    displayField: string;
    compareField: string;
    debounceTimeSearch: number;
    nzIcon?: INzIcon;
    importedIcon?: IconName;
}

export { ICheckboxDropdownConfig };
