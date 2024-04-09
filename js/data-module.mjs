// Модуль для работы с данными

/* Данные о фотографии
photoObj {
  id: idPhoto,
  url: `photos/${idPhoto}.jpg`,
  description: `Тут будет описание ${idPhoto} фотографии`,
  likes: getRandomInt(MIN_CNT_LIKES, MAX_CNT_LIKES),
  comments: genComments(MIN_CNT_MESSAGE, MAX_CNT_MESSAGE)
};

// Данные о комментариях к фотографии
commentsObj {
    id: genMessageId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
*/

import {COUNT_MAX_COMMENTS_VIEW, COUNT_RANDOM_PHOTOS} from './const.mjs';
import {getRandomInt} from './utils.mjs';

const URL_SERVER = 'https://31.javascript.htmlacademy.pro/kekstagram';

const FetchMethod = {
  GET: {
    name: 'GET',
    route: '/data',
    errorText: 'Не далось загрузить данные с сервера. Попробуйте обновить страницу'
  },
  POST: {
    name: 'POST',
    route: '/',
    errorText: 'Не удалось отправить данные на сервер. Попробуйте ещё раз'
  }
};

const loadData = (method = FetchMethod.GET, body = null) =>
  fetch(`${URL_SERVER}${method.route}`, {method: method.name, body: body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(method.errorText);
    });

let photosDefault;

const getData = () =>
  loadData(FetchMethod.GET)
    .then((photos) => {
      photosDefault = photos;
      return photos;
    });

const sendData = (body) => loadData(FetchMethod.POST, body);

const getComments = (photo, startIndex = 0, countCcomments = COUNT_MAX_COMMENTS_VIEW) =>
  photo.comments.slice(startIndex, startIndex + countCcomments);

const getPhotosDefault = () => photosDefault;

const getPhotosRandom = (countPhoto = COUNT_RANDOM_PHOTOS) => {
  const result = [];
  let randomIdx;
  while (result.length < countPhoto) {
    randomIdx = getRandomInt(0, photosDefault.length - 1);
    if (result.indexOf(photosDefault[randomIdx]) === -1) {
      result.push(photosDefault[randomIdx]);
    }
  }
  return result;
};

const getPhotosDiscussed = () => photosDefault.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);

export {getPhotosDefault, getComments, getPhotosRandom, getPhotosDiscussed, getData, sendData, URL_SERVER};
