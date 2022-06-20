import moment from 'moment';

import { IDictionaryItem } from '@app-shared/interfaces/dictionary-item.interface';
import { ISortOption } from '@app-shared/interfaces/sort.interface';
import { ITableHeaderModel } from '@app-shared/interfaces/table-header.interface';
import { IUser } from 'src/app/user/interfaces/user.interface';

const REGEX_VALID_DATE = /^(1[0-9]|2[0-9]|3[0-1]|0?[1-9])[\/\-\.\s](1[0-2]|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|0?[1-9])[\/\-\.\s](\d{4}$)/i;
const MONTH_NO = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12
};

const UTCTime = (time: any) => {
  if (!time || isNaN(+new Date(time))) {
    return null;
  }
  const formatTime = new Date(time);
  const getYear = formatTime.getUTCFullYear();
  const getMonth = formatTime.getUTCMonth() + 1;
  const getDate = formatTime.getUTCDate();
  const getHour = formatTime.getUTCHours();
  const getMin = formatTime.getUTCMinutes();
  const getSec = formatTime.getUTCSeconds();
  const getMs = formatTime.getUTCMilliseconds();
  const year = getYear < 10 ? `0${getYear}` : getYear;
  const month = getMonth < 10 ? `0${getMonth}` : getMonth;
  const date = getDate < 10 ? `0${getDate}` : getDate;
  const hour = getHour < 10 ? `0${getHour}` : getHour;
  const min = getMin < 10 ? `0${getMin}` : getMin;
  const sec = getSec < 10 ? `0${getSec}` : getSec;
  const ms = getMs < 10 ? `0${getMs}` : getMs;
  return {
    year,
    month,
    date,
    hour,
    min,
    sec,
    ms,
    format: `${year}-${month}-${date}T${hour}:${min}:${sec}.${ms}Z`
  };
};

const clientTime = (utcTime: any): number | null => {
  if (!utcTime) {
    return null;
  }
  if (typeof utcTime !== 'string') {
    utcTime = String(utcTime);
  }
  if (utcTime.endsWith('+0000')) {
    utcTime = utcTime.replace(/\+0000$/, '');
  }
  if (!/z$|gmt$|utc$/i.test(utcTime)) {
    utcTime = utcTime.replace(/\s+$/, '') + 'Z';
  }
  const client = new Date(utcTime);
  return +client;
};

const validDate = (dateNeedCheck: string): string => {
  if (!REGEX_VALID_DATE.test(dateNeedCheck)) {
    return 'Invalid date, please enter a valid value';
  }
  let { day, month, year } = REGEX_VALID_DATE.exec(dateNeedCheck).reduce(
    (result, item, index, [dayValue, monthValue, yearValue]) => ({
      day: +dayValue,
      month: monthValue,
      year: +yearValue
    }),
    { day: 0, month: '', year: 0 }
  );
  if (isNaN(Number(month))) {
    month = MONTH_NO[month];
  }
  const generalNumberOfDaysInTheMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if ((!isLeapYear && day > generalNumberOfDaysInTheMonth[+month - 1]) || (isLeapYear && +month !== 2 && day > generalNumberOfDaysInTheMonth[+month - 1])) {
    return `There are only ${generalNumberOfDaysInTheMonth[+month - 1]} days in month: ${+month}`;
  }
  if (isLeapYear && +month === 2 && day > 29) {
    return `There are only 29 days in month: ${+month}`;
  }
  return '';
};

const getIndexOfWeekInYear = (day: any): number => {
  const formatDate = clientTime(day);
  if (!formatDate) {
    return 0; // 0 == error
  }
  const targetDay = new Date(formatDate);
  const firstDayOfYear = new Date(targetDay.getFullYear(), 0, 1);
  const pastDaysOfYear = (+targetDay - +firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const diffPartCompareTwoString = (compareString: string, originString: string): string => {
  return compareString.split(originString).join('').trim();
};

const capitalizeWords = (str: string) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const transformToUnsignedText = (value: any): string => {
  if (!value) {
    return '';
  }
  let slug: string;
  slug = String(value).trim();
  slug = slug.toLowerCase();
  slug = slug.replace(/[áàảạãăắằẳẵặâấầẩẫậ]/gi, 'a');
  slug = slug.replace(/[éèẻẽẹêếềểễệ]/gi, 'e');
  slug = slug.replace(/[iíìỉĩị]/gi, 'i');
  slug = slug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi, 'o');
  slug = slug.replace(/[úùủũụưứừửữự]/gi, 'u');
  slug = slug.replace(/[ýỳỷỹỵ]/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/\s+/gi, '-');
  slug = slug.replace(/\-+/gi, '-');
  slug = `@${slug}@`;
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

const capitalizeStrings = (str: string) => (str || '').replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

const createUUID = () => {
  let time = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (matchValue) => {
    // tslint:disable-next-line: no-bitwise
    const r = (time + Math.random() * 16) % 16 | 0;
    time = Math.floor(time / 16);
    // tslint:disable-next-line: no-bitwise
    return (matchValue === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

const createSortOptionDataTable = (tableHeaders: ITableHeaderModel<any>[]): ISortOption => tableHeaders.reduce((result: ISortOption, item) => {
  if (!!item.sortValue) {
    const sortValue: string = item.sortValue as string;
    result[sortValue] = {
      sortBy: sortValue,
      isDefault: !!item.isDefault,
      isDescending: !!item.isDescending,
    }
  }
  return result;
}, {});

const PATTERN_REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  EXTRACT_TEXT_BETWEEN_SLASH: /(?<=\/).+?(?=\/)/
};

const mapDataToDictionaryItem = <T>(data: T[] = [], keyId: string, keyName: string, chosenIds: string[] = []): IDictionaryItem[] => {
  return data.map(item => {
    return {
        id: item[keyId].toString(),
        name: item[keyName],
        isSelected: chosenIds.indexOf(item[keyId].toString()) !== -1
    };
  });
};

// const mapUserToDictionaryItem = (data: IUser[] = [], chosenIds: string[] = []): IDictionaryItem[] => {
//   return data.map(item => {
//     return {
//         id: item.id.toString(),
//         name: `${item.firstName} ${item.lastName}`,
//         value: item.empCode,
//         isActive: item.isActive,
//         isSelected: chosenIds.indexOf(item.id.toString()) !== -1,
//         code: item.empCode
//     };
//   });
// };

const mapUserDictionaryToModel = (users: IDictionaryItem[]): {id: number, fullName: string, empCode: string }[] => {
  return users.map(user => {
      return {
          id: parseInt(user.id),
          fullName: user.name,
          empCode: user.value
      };
  });
};

const base64Code = (file) => {
  return file.content.substr(file.content.indexOf(',') + 1, file.content.length);
};

const getSymbolAvatar = (firstName: string, lastName: string): string => {
  return `${firstName[0].toLocaleUpperCase()}${lastName[0].toLocaleUpperCase()}`;
}

const calculateDaysToNow = (date: string): string => {
  return date ? moment(new Date(date)).fromNow() : '';
}

const checkPluralDate = (date: number): string => {
  return date > 1 ? 's' : '';
};

const convertStatus = (status: string): string => {
  return status.replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toUpperCase();
      }).trim();
}

export {
  UTCTime,
  clientTime,
  diffPartCompareTwoString,
  capitalizeWords,
  transformToUnsignedText,
  capitalizeStrings,
  createUUID,
  createSortOptionDataTable,
  PATTERN_REGEX,
  mapDataToDictionaryItem,
  mapUserDictionaryToModel,
  getSymbolAvatar,
  calculateDaysToNow,
  base64Code,
  convertStatus
};
