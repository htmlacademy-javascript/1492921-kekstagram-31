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

const getNumberFromString = str => parseInt(String(str).split('').filter((char) => char >= '0' && char <= '9').join(''), 10);

// Строка короче 20 символов
console.log(checkStrLenght('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkStrLenght('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkStrLenght('проверяемая строка', 10)); // false

// Строка является палиндромом
console.log(isPolindrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPolindrom('ДовОд')); // true
// Это не палиндром
console.log(isPolindrom('Кекс')); // false
// Это палиндром
console.log(isPolindrom('Лёша на полке клопа нашёл ')); // true

console.log(getNumberFromString('2023 год')); // 2023
console.log(getNumberFromString('ECMAScript 2022')); // 2022
console.log(getNumberFromString('1 кефир, 0.5 батона')); // 105
console.log(getNumberFromString('агент 007')); // 7
console.log(getNumberFromString('а я томат')); // NaN

console.log(getNumberFromString(2023)); // 2023
console.log(getNumberFromString(-1)); // 1
console.log(getNumberFromString(1.5)); // 15
