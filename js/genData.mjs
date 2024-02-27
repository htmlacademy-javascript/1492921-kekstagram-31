import {createId} from './utils.mjs';
import {rndInt} from './random.mjs';
import {getRndArrElement} from './random.mjs';

const MIN_CNT_LIKES = 15;
const MAX_CNT_LIKES = 200;
const MIN_CNT_MESSAGE = 0;
const MAX_CNT_MESSAGE = 30;

const genMessageId = createId();
const genPhotoId = createId();

const genComment = () => {
  const names = ['Иван', 'Наталья', 'Семён', 'Мария', 'Денис', 'Юлия', 'Антон', 'Алесксандр', 'Ирина', 'Надежда'];
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return {
    id: genMessageId(),
    avatar: `img/avatar-${rndInt(1, 6)}.svg`,
    message: getRndArrElement(messages),
    name: getRndArrElement(names)
  };
};
const genComments = (minCnt, maxCnt) => Array.from({length: rndInt(minCnt, maxCnt)}, genComment);

const genPhoto = () => {
  const idPhoto = genPhotoId();
  return {
    id: idPhoto,
    url: `photos/${idPhoto}.jpg`,
    description: `Тут будет описание ${idPhoto} фотографии`,
    likes: rndInt(MIN_CNT_LIKES, MAX_CNT_LIKES),
    comments: genComments(MIN_CNT_MESSAGE, MAX_CNT_MESSAGE)
  };
};
const genPhotos = (cnt) => Array.from({length: cnt}, genPhoto);

export {genComments, genPhotos};

