import moment from "moment";

const DATE_AND_TIME_FORMAT = "YYYY/MM/DD HH:mm:ss";
const DATE_FORMAT = "YYYY/MM/DD";

export function convertToDateAndTime(value: string | Date) {
  return moment(value).format(DATE_AND_TIME_FORMAT);
}

/**
 *
 * @param {string} value
 * @returns yyyy/mm/dd
 */
export function convertToDate(value: string | Date) {
  return moment(value).format(DATE_FORMAT);
}

/**
 *
 * @param {string} value
 * @returns e.g. October 24, 2024 3:34 PM
 */
export function convertToFullDateAndTime(value: string | Date) {
  return moment(value).format("LLL");
}