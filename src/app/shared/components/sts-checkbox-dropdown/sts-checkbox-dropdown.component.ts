import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { cloneDeep, orderBy } from 'lodash';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

import { CheckboxDropdownConfig } from '@app-shared/models/checkbox-dropdown-config';

import { IDictionaryItem } from '@app-shared/interfaces/dictionary-item.interface';

@Component({
  selector: 'app-sts-checkbox-dropdown',
  templateUrl: './sts-checkbox-dropdown.component.html',
  styleUrls: ['./sts-checkbox-dropdown.component.scss']
})
export class StsCheckboxDropdownComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild('searchBox', { static: false }) private _searchBox: ElementRef<HTMLInputElement>;

  @Input() config = new CheckboxDropdownConfig();

  @Input('data')
  set data(value: IDictionaryItem[]) {
    this._dataSource = value && value.length ? cloneDeep(value).map(item => ({ ...item, selected: false })) : [];
    if (this.config.isSort) {
      this._dataSource = orderBy(this._dataSource, [this.config.displayField], ['asc']);
    }
  }
  get data(): IDictionaryItem[] {
    return this._dataSource || [];
  }

  @Input() initiated: IDictionaryItem[] = [];
  @Input() disabled = false;
  @Input() placeholder = 'Select value';
  @Input() reset: Subject<boolean>;
  @Output() result = new EventEmitter<IDictionaryItem[]>();

  isShow = false;
  searchTerm$ = new Subject<string>();
  searchTerm: string;
  newValue: string;
  dataFiltered: Array<IDictionaryItem> = [];
  selectedResult: Array<IDictionaryItem> = [];

  private _dataSource: Array<IDictionaryItem> = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this._mapInitResult();
    this.searchTerm$.next('');
    this._filter(this.searchTerm || '');
  }

  ngOnInit() {
    this.searchTerm$
      .pipe(debounceTime(this.config.debounceTimeSearch))
      .subscribe(text => {
        this._filter(text);
        this.searchTerm = text;
        this.newValue = text;
      });
    if (this.reset) {
      this.reset.subscribe((isReset: boolean) => {
        if (isReset) {
          this.clearAll();
        }
      });
    }
  }

  ngOnDestroy() {
    this.reset && this.reset.unsubscribe();
  }

  onToggle(): void {
    this.isShow = !this.isShow;
    setTimeout(() => {
      if (this._searchBox && this._searchBox.nativeElement) {
        this._searchBox.nativeElement.focus();
      }
    });
  }

  onDropBoxFocus(event: FocusEvent): void {
    event.stopPropagation();

    setTimeout(() => {
      if (this._searchBox && this._searchBox.nativeElement) {
        this._searchBox.nativeElement.focus();
      }
    });
  }

  onSelectItem(event: Event, item: IDictionaryItem): void {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    const isCurrentCheck = item.isSelected;
    if (this.config.isMultiple) {
      item.isSelected = !item.isSelected;
    } else {
      this.data.forEach(itemInData => (itemInData.isSelected = false));
      !isCurrentCheck && (item.isSelected = true);
    }
    this.config.isCloseWhenChosen && (this.isShow = false);
    setTimeout(() => {
      this._refreshSelectedResult();
    });
  }

  onRemoveSelectedItem(event: Event, item: IDictionaryItem): void {
    event.stopPropagation();
    if (!this.disabled) {
      item.isSelected = false;
      this._refreshSelectedResult();
    }
  }

  onAddNewValue(): void {
    if (!this.config.isAddNewWhenNotExist) {
      return;
    }
    const newID = Math.max(...[...this.data].map(item => +item.id)) + 1;
    const createNewValue: IDictionaryItem = {
      id: String(newID),
      name: this.newValue,
      value: this.newValue,
      text: this.newValue,
      isSelected: true
    };
    this.data.push(createNewValue);
    this.searchTerm$.next('');
    this.searchTerm = '';
    if (this.config.isCloseWhenChosen) {
      this.isShow = false;
    } else {
      this._searchBox.nativeElement.focus();
    }
    this._refreshSelectedResult();
  }

  selectAll(): void {
    if (!this.disabled) {
      this.data.forEach(item => {
        item.isSelected = true;
      });
      this._refreshSelectedResult();
    }
  }

  clearAll(): void {
    if (!this.disabled) {
      this.data.forEach(item => {
        item.isSelected = false;
      });
      this._refreshSelectedResult();
    }
  }

  clickOutside(isClickOutside: boolean) {
    if (isClickOutside) {
      this.isShow = false;
    }
  }

  trackFilteredData(index: number, item: IDictionaryItem): string | number {
    return item.id || index;
  }

  trackSelectedResult(index: number, item: IDictionaryItem): string | number {
    return item.id || index;
  }

  displayValue() {
    return this.config.isMultiple ? this.placeholder : (this.selectedResult && this.selectedResult.length > 0 ? this.selectedResult[0][this.config.displayField] : this.placeholder);
  }

  usePlaceholder() {
    return this.config.isMultiple || (!this.config.isMultiple && (!this.selectedResult || this.selectedResult.length === 0));
  }

  private _refreshSelectedResult(): void {
    this.selectedResult = this.data.filter(item => item.isSelected);
    this.result.emit(this.selectedResult);
  }

  private _filter(text: string): void {
    this.dataFiltered = this.data.filter(item => {
      return (item[this.config.displayField] ? item[this.config.displayField] : '')
      .toString()
      .toLowerCase()
      .includes(text.toLowerCase().replace(/(^\s+)|(\s+$)/gim, ''))
      || (item.code ? item.code : '')
      .toString()
      .toLowerCase()
      .includes(text.toLowerCase().replace(/(^\s+)|(\s+$)/gim, ''));
    });
  }

  private _mapInitResult(): void {
    if (this.initiated && this.initiated.length > 0) {
      const idsExistInSource = [...this.data].map(item => item[this.config.compareField]);
      const valuesNotExistInSource = [...this.initiated].filter(item => !idsExistInSource.includes(item[this.config.compareField]));
      const selectedValuesInSource: IDictionaryItem[] = [...this.data].map((item): IDictionaryItem => {
        const selectedInInit = this.initiated.find(initItem => initItem[this.config.compareField] === item[this.config.compareField]);
        return { ...item, isSelected: !!selectedInInit };
      });
      valuesNotExistInSource.forEach(valueNotExist => {
        const newID = Math.max(...selectedValuesInSource.map(item => +item.id)) + 1;
        const createItem: IDictionaryItem = { ...valueNotExist, ...{ id: valueNotExist.id ? valueNotExist.id : String(newID), isSelected: true } };
        selectedValuesInSource.push(createItem);
      });
      this.data = selectedValuesInSource;
    }
    setTimeout(() => {
      this._filter('');
      this.selectedResult = this.data.filter(item => item.isSelected);
    });
  }
}
