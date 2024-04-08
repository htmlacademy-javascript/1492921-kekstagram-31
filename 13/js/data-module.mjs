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

//import {COUNT_PHOTOS, MAX_COUNT_COMMENTS} from './const.mjs';
//import {genPhotos} from './gen-data.mjs';
import {COMMENTS_MAX_COUNT_VIEW, COUNT_RANDOM_PHOTOS} from './const.mjs';
import {getRandomInt} from './random.mjs';

const URL_SERVER = 'https://31.javascript.htmlacademy.pro/kekstagram';

const FetchMethod = {
  GET: {
    name: 'GET',
    addUrl: '/data',
    errorText: 'Не далось загрузить данные с сервера. Попробуйте обновить страницу'
  },
  POST: {
    name: 'POST',
    addUrl: '/',
    errorText: 'Не удалось отправить данные на сервер. Попробуйте ещё раз'
  }
};

const loadData = (method = FetchMethod.GET, body = null) =>
  fetch(`${URL_SERVER}${method.addUrl}`, {method: method.name, body: body})
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

//const photosDefault = genPhotos(COUNT_PHOTOS);

const getPhoto = (idFind) => photosDefault.find((photo) => photo.id === Number(idFind));

const getComments = (photo, startIndex = 0, commentsCount = COMMENTS_MAX_COUNT_VIEW) =>
  photo.comments.slice(startIndex, startIndex + commentsCount);

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

export {photosDefault, getPhoto, getComments, getPhotosRandom, getPhotosDiscussed, getData, sendData, URL_SERVER};
