// Модуль для хранения и обработки данных

/*
photoObj {
  id: idPhoto,
  url: `photos/${idPhoto}.jpg`,
  description: `Тут будет описание ${idPhoto} фотографии`,
  likes: getRandomInt(MIN_CNT_LIKES, MAX_CNT_LIKES),
  comments: genComments(MIN_CNT_MESSAGE, MAX_CNT_MESSAGE)
};

commentsObj {
    id: genMessageId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
*/

import {COUNT_PHOTOS} from './const.mjs';
import {genPhotos} from './gen-data.mjs';

const photos = genPhotos(COUNT_PHOTOS);

// eslint-disable-next-line no-return-assign
const getPhoto = (idFind) => photos.find((photo) => photo.id == idFind);

export {photos, getPhoto};
