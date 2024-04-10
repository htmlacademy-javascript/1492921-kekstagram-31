import {DEBOUNCE_DELAY} from './const.mjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (cb, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

export {isEscapeKey, getRandomInt, debounce};


