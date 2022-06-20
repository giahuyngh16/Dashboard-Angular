import { Directive, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ISortConfig } from '@app-shared/interfaces/sort.interface';

@Directive({
  selector: '[appStsSortTable]'
})
export class StsSortTableDirective implements OnInit {
  @Input()
  set appStsSortTable(value: ISortConfig) {
    this._sortTableModel = value;
  }
  @Input() innerText: string;
  @Output() sortChange = new EventEmitter<any>();

  private _sortTableModel: ISortConfig = {
    sortBy: '',
    isDefault: false,
    isDescending: false
  };
  private _classesSortTable = {
    availableSort: 'available-sort',
    ascSort: 'asc-sort',
    descSort: 'desc-sort',
    selectedSort: 'selected-sort'
  };
  private _sortFontAwesomeIcon = {
    sorting: `<img class="fa fa-sort-amount-asc" src="assets/img/icon/asc.svg" alt="">`,
    sortAvailable: `<img style="opacity: 0.3; height: 10px" class="fa fa-arrows-v" src="assets/img/icon/sort.svg" alt="">`
  };

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit() {
    const sortAvailable = this._document.createRange().createContextualFragment(this._sortFontAwesomeIcon.sortAvailable);
    const sorting = this._document.createRange().createContextualFragment(this._sortFontAwesomeIcon.sorting);
    (this._element.nativeElement as HTMLElement).appendChild(sortAvailable);
    (this._element.nativeElement as HTMLElement).appendChild(sorting);
    this._renderer.addClass(this._element.nativeElement, this._classesSortTable.availableSort);
    if (this._sortTableModel.isDefault) {
      this._renderer.addClass(this._element.nativeElement, this._sortTableModel.isDescending ? this._classesSortTable.descSort : this._classesSortTable.ascSort);
      this._renderer.addClass(this._element.nativeElement, this._classesSortTable.selectedSort);
    }
  }

  private _toggleSortClass() {
    this._renderer.addClass(
      this._element.nativeElement,
      this._sortTableModel.isDescending ? this._classesSortTable.ascSort : this._classesSortTable.descSort
    );
    this._renderer.removeClass(
      this._element.nativeElement,
      this._sortTableModel.isDescending ? this._classesSortTable.descSort : this._classesSortTable.ascSort
    );
  }
  
  private _removeSelectedClassAllChildren() {
    this._getChildrenElementSameLevelAsArray().forEach(elementItem => {
      if (elementItem.classList.contains(this._classesSortTable.selectedSort)) {
        this._renderer.removeClass(elementItem, this._classesSortTable.selectedSort);
      }
    });
  }

  private _getChildrenElementSameLevelAsArray(): Array<Element> {
    return (
      !!this._element.nativeElement.parentNode
      && !!this._element.nativeElement.parentNode.children
      && !!this._element.nativeElement.parentNode.children.length
    ) ? Array.from(this._element.nativeElement.parentNode.children as HTMLCollection) : [];
  }

  @HostListener('click')
  onMouseClick() {
    this._removeSelectedClassAllChildren();
    this._renderer.addClass(this._element.nativeElement, this._classesSortTable.selectedSort);
    this._toggleSortClass();
    this._sortTableModel.isDescending = !this._sortTableModel.isDescending;
    this.sortChange.emit(this._sortTableModel);
  }
}
