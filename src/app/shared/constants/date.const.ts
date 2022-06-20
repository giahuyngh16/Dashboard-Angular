import moment from 'moment';

import { IDateRange } from '@app-shared/interfaces/date-range.interface';

export const DATE_FORMAT = {
    DDMMYYYY: 'DD/MM/YYYY',
    DDMMMYYYY: 'DD MMM YYYY',
    ddMMyyyy: 'dd/MM/yyyy',
    MMDDYYYY: 'MM/DD/YYYY',
    YYYYMMDD: 'YYYY-MM-DD',
    ddMMMyyyy: 'dd MMM yyyy',
    ddMMMYYYY: 'dd MMM, yyyy',
    MMMYYYY: 'MMM YYYY',
    MMMyyyy: 'MMM yyyy',
    HHmm: 'HH:mm',
    FULL_DATE_TIME: 'dd MMM yyyy hh:mm aa',
    FUll_DATE: 'dd MMM yyyy hh:mm'
};

export const DATE_RANGE_TYPE = {
    NONE: 'None',
    TODAY: 'Today',
    YESTERDAY: 'Yesterday',
    LAST_7_DAYS: 'Last7Days',
    LAST_30_DAYS: 'Last30Days',
    THIS_MONTH: 'ThisMonth',
    LAST_MONTH: 'LastMonth',
    THIS_YEAR: 'ThisYear',
    CUSTOM_RANGE: 'CustomRange'
};

export const DATE_RANGE: IDateRange[] = [
    {
        id: DATE_RANGE_TYPE.NONE,
        name: 'None',
        startDate: null,
        endDate: null,
    },
    {
        id: DATE_RANGE_TYPE.TODAY,
        name: 'Today',
        startDate: new Date(new Date().setHours(0, 0, 0)),
        endDate: new Date(new Date().setHours(23, 59))
    },
    {
        id: DATE_RANGE_TYPE.YESTERDAY,
        name: 'Yesterday',
        startDate: new Date(moment().subtract(1, 'days').format(DATE_FORMAT.MMDDYYYY)),
        endDate: new Date(new Date(moment().subtract(1, 'days').format(DATE_FORMAT.MMDDYYYY)).setHours(23, 59, 59))
    },
    {
        id: DATE_RANGE_TYPE.LAST_7_DAYS,
        name: 'Last 7 Days',
        startDate: new Date(moment().subtract(6, 'days').format(DATE_FORMAT.MMDDYYYY)),
        endDate: new Date(),
    },
    {
        id: DATE_RANGE_TYPE.LAST_30_DAYS,
        name: 'Last 30 Days',
        startDate: new Date(moment().subtract(29, 'days').format(DATE_FORMAT.MMDDYYYY)),
        endDate: new Date(),
    },
    {
        id: DATE_RANGE_TYPE.THIS_MONTH,
        name: 'This Month',
        startDate: new Date(moment().startOf('month').format(DATE_FORMAT.MMDDYYYY)),
        endDate: new Date(),
    },
    {
        id: DATE_RANGE_TYPE.LAST_MONTH,
        name: 'Last Month',
        startDate: new Date(moment().subtract(1, 'month').startOf('month').format(DATE_FORMAT.MMDDYYYY)),
        endDate: new Date(moment().subtract(1, 'month').endOf('month').format(DATE_FORMAT.MMDDYYYY)),
    },
    {
        id: DATE_RANGE_TYPE.THIS_YEAR,
        name: 'This Year',
        startDate: new Date(moment().startOf('year').format(DATE_FORMAT.MMDDYYYY)),
        endDate: new Date(moment().endOf('year').format(DATE_FORMAT.MMDDYYYY)),
    },
    {
        id: DATE_RANGE_TYPE.CUSTOM_RANGE,
        name: 'Custom Range',
        startDate: null,
        endDate: null,
    },
];
