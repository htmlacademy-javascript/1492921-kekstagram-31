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

