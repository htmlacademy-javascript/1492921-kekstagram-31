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
import {MAX_COUNT_COMMENTS} from './const.mjs';

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

const getData = () => loadData(FetchMethod.GET);

const sendData = (body) => loadData(FetchMethod.POST, body);

//const photos;
//const photos = genPhotos(COUNT_PHOTOS);
//const getPhoto = (idFind) => photos.find((photo) => photo.id === Number(idFind));

const getComments = (photo, startIndex = 0, commentsCount = MAX_COUNT_COMMENTS) => photo.comments.slice(startIndex, startIndex + commentsCount);

export {/*photos, getPhoto, */getComments, getData, sendData, URL_SERVER};
