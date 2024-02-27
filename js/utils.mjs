function createId () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
}
export {createId};


