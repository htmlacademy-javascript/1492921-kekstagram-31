import {MIN_COUNT_LIKES, MAX_COUNT_LIKES, MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS, RANDOM_NAMES, RANDOM_MESSAAGES} from './const.mjs';
import {createId} from './utils.mjs';
import {getRandomInt} from './random.mjs';
import {getRandomArrayElement} from './random.mjs';

const genMessageId = createId();
const genPhotoId = createId();

const genComment = () => ({
  id: genMessageId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(RANDOM_MESSAAGES),
  name: getRandomArrayElement(RANDOM_NAMES)
});

const genComments = (minCnt, maxCnt) => Array.from({length: getRandomInt(minCnt, maxCnt)}, genComment);

const genPhoto = () => {
  const idPhoto = genPhotoId();
  return {
    id: idPhoto,
    url: `photos/${idPhoto}.jpg`,
    description: `Тут будет описание ${idPhoto} фотографии`,
    likes: getRandomInt(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: genComments(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)
  };
};

const genPhotos = (cnt) => Array.from({length: cnt}, genPhoto);

export {genComments, genPhotos, genPhoto};

