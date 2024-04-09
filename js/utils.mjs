function createId () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
}

function isInt(value) {
  return !isNaN(value) &&
         String(value).trim() === String(parseInt(value, 10));
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
}

export {createId, isInt, isEscapeKey, debounce};


