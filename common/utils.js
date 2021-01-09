/**
 * Adds zero in front of the number if the given number is less than 10
 * @param {Integer} number 
 */
export function zeroPad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

/**
 * Returns hour with given display format. e.g. if displayFormat is "12h" and hours is "23", then result will be "11"
 * @param {String} displayFormat 
 * @param {Integer} hours 
 */
export function getHour(displayFormat, hours) {
  return displayFormat === "12h" ? (hours % 12 || 12) : hours; 
}

/**
 * Returns the name of the day with the given index. e.g. 0 returns PAZ.
 * @param {Integer} dayIndex 
 */
export function getDayName(dayIndex) {
  return _days[dayIndex];
}

/**
 * Returns the name of the month with the given index. e.g. 0 returns OCA.
 * @param {Integer} monthIndex 
 */
export function getMontName(monthIndex) {
  return _months[monthIndex];
}

const _days = {
  0: 'PAZ',
  1: 'PZT',
  2: 'SAL',
  3: 'ÇAR',
  4: 'PER',
  5: 'CUM',
  6: 'CMT'
};

const _months = {
  0: 'OCA',
  1: 'ŞUB',
  2: 'MAR',
  3: 'NİS',
  4: 'MAY',
  5: 'HAZ',
  6: 'TEM',
  7: 'AĞU',
  8: 'EYL',
  9: 'EKİ',
  10: 'KAS',
  11: 'ARA'
}