export const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

export const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
