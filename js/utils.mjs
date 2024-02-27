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

export {createId, isInt};


