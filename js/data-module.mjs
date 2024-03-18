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

import {COUNT_PHOTOS, MAX_COUNT_COMMENTS} from './const.mjs';
import {genPhotos} from './gen-data.mjs';

const photos = genPhotos(COUNT_PHOTOS);

const getPhoto = (idFind) => photos.find((photo) => photo.id === Number(idFind));

const getComments = (photo, startIndex = 0, commentsCount = MAX_COUNT_COMMENTS) => photo.comments.slice(startIndex, startIndex + commentsCount);

export {photos, getPhoto, getComments};
