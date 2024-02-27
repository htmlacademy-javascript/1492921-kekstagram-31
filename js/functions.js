import {isTime, HourFromStartDay, MinuteFromStartDay} from './time.mjs';
import {isInt} from './utils.mjs';

const isMeetingInWorktime = function (startWortime, endWortime, startMeeting, delayMeeting) {
  // Проверка параметров функции
  if (!isTime(startWortime)) {
    return `Некорректное время начала рабочего дня = "${startWortime}"\nНеобходимо укаать время в формате чч:мм`;
  }
  if (!isTime(endWortime)) {
    return `Некорректное время окончания рабочего дня = "${endWortime}"\nНеобходимо укаать время в формате чч:мм`;
  }
  if (!isTime(startMeeting)) {
    return `Некорректное время начала встречи = "${startMeeting}"\nНеобходимо укаать время в формате чч:мм`;
  }
  if (!isInt(delayMeeting) || delayMeeting <= 0) {
    return `Некорректная продолжительность встеречи в минутах = "${delayMeeting}"\nНеобходимо укаать челое положительное число`;
  }
  return HourFromStartDay(startMeeting) >= HourFromStartDay(startWortime) // встреча начинается после начала рабочего дня
         && MinuteFromStartDay(startMeeting) + delayMeeting <= MinuteFromStartDay(endWortime);
};

isMeetingInWorktime('08:00', '17:30', '14:00', 90);
isMeetingInWorktime('8:0', '10:0', '8:0', 120);
isMeetingInWorktime('08:00', '14:30', '14:00', 90);
isMeetingInWorktime('14:00', '17:30', '08:0', 90);
isMeetingInWorktime('8:00', '17:30', '08:00', 900);

// Старые задания
const checkStrLenght = function(str, maxLen) {
  return str.length <= maxLen;
};

const isPolindrom = function (str) {
  const strNorm = str.replaceAll(' ', '').toUpperCase();
  let strRevers = '';
  for (let i = strNorm.length - 1; i >= 0; i--) {
    strRevers += strNorm[i];
  }
  return strNorm === strRevers;
};

const getNumber = (str) => parseInt(String(str).split('').filter((char) => char >= '0' && char <= '9').join(''), 10);

// Строка короче 20 символов
checkStrLenght('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStrLenght('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStrLenght('проверяемая строка', 10); // false

// Строка является палиндромом
isPolindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPolindrom('ДовОд'); // true
// Это не палиндром
isPolindrom('Кекс'); // false
// Это палиндром
isPolindrom('Лёша на полке клопа нашёл '); // true

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN

getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15
