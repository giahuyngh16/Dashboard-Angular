import { IDictionaryItem } from '@app-shared/interfaces/dictionary-item.interface';

export class CheckboxDropdownConfig {
  isMultiple = true;
  isCloseWhenChosen = false;
  isAddNewWhenNotExist = false;
  isDisplaySelectedResult = true;
  isDisplaySelectedTag = false;
  isSearchMode = true;
  isSort = true;
  placeHolderSearchBox = 'Type something...';
  displayField: keyof IDictionaryItem = 'name';
  compareField: keyof IDictionaryItem = 'id';
  debounceTimeSearch = 0;
  nzIcon = { type: 'unordered-list', theme: 'outline' };
  importedIcon?: string;
}
