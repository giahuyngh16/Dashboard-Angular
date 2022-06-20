import { Component, OnInit, Input, EventEmitter, Output, HostListener, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { DATE_RANGE, DATE_RANGE_TYPE, DATE_FORMAT } from '@app-shared/constants/date.const';

import { IDateRange } from '@app-shared/interfaces/date-range.interface';

type Alignment = 'left' | 'right';

@Component({
    selector: 'app-sts-date-range',
    templateUrl: './sts-date-range.component.html',
    styleUrls: ['./sts-date-range.component.scss']
})
export class StsDateRangeComponent implements OnInit, OnChanges, OnDestroy {
    @Input() defaultValue: { fromDate: Date, toDate: Date };
    @Input() set isRequired(value: boolean) {
        if (value) {
            this.DATE_RANGE = this.DATE_RANGE.filter(date => date.endDate && date.startDate);
        }
    }

    @Input() placeholder = 'Select';
    @Input() alignment: Alignment = 'left';
    @Input() selectedType: IDateRange = DATE_RANGE[0];
    @Input() reset: Subject<boolean>;

    @Output() selectedTypeChange = new EventEmitter<IDateRange>();

    DATE_RANGE = DATE_RANGE;
    DATE_RANGE_TYPE = DATE_RANGE_TYPE;
    DATE_FORMAT = DATE_FORMAT;

    isShow = false;
    isShowDateRangePicker = false;

    private _customRange = DATE_RANGE.find(dateRange => dateRange.id === DATE_RANGE_TYPE.CUSTOM_RANGE);

    constructor(
        private _elementRef: ElementRef
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.defaultValue && (this.selectedType.id === DATE_RANGE_TYPE.CUSTOM_RANGE || this.selectedType.id === DATE_RANGE_TYPE.NONE)) {
            if (this.defaultValue && this.defaultValue.fromDate && this.defaultValue.toDate) {
                this._customRange.startDate = this.defaultValue.fromDate;
                this._customRange.endDate = this.defaultValue.toDate;
                this.selectedType = { ...this._customRange };
            }
        }
    }

    ngOnInit() {
        if (this.reset) {
            this.reset.subscribe((isReset: boolean) => {
                if (isReset) {
                    this.selectedType = DATE_RANGE[0];
                }
            });
        }
    }

    ngOnDestroy() {
        this.reset && this.reset.unsubscribe();
    }

    onClickControl(): void {
        this.isShow = !this.isShow;
        this.isShowDateRangePicker = false;
    }

    onSelectItem(selectedItem: IDateRange): void {
        if (selectedItem) {
            this.isShow = false;
            if (selectedItem.id !== DATE_RANGE_TYPE.CUSTOM_RANGE) {
                this.selectedType = selectedItem;
                this.selectedTypeChange.emit(this.selectedType);
            } else {
                this.isShowDateRangePicker = true;
            }
        }
    }

    onChangeDateRangePicker([startDate, endDate]): void {
        if (startDate && endDate) {
            this._customRange.startDate = startDate;
            this._customRange.endDate = endDate;
            this.selectedType = { ...this._customRange };
            this.selectedTypeChange.emit(this.selectedType);
            this.isShowDateRangePicker = false;
            this.isShow = false;
        }
    }

    @HostListener('document:mousedown', ['$event'])
    clickOutSide(event) {
        if (!this._elementRef.nativeElement.contains(event.target)) {
            this.isShow = false;
            const dateRangerPopup = document.getElementsByTagName('date-range-popup');

            if (dateRangerPopup.length > 0 && !dateRangerPopup[0].contains(event.target)) {
                this.isShowDateRangePicker = false;
            }
        }
    }
}
