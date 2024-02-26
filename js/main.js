const MIN_CNT_LIKES = 15;
const MAX_CNT_LIKES = 200;
const MIN_CNT_MESSAGE = 0;
const MAX_CNT_MESSAGE = 30;
const CNT_PHOTOS = 25;

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function createId () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
}
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
  const getRndArrElement = (arr) => arr[rnd(0, arr.length - 1)];
  return {
    id: genMessageId(),
    avatar: `img/avatar-${rnd(1, 6)}.svg`,
    message: getRndArrElement(messages),
    name: getRndArrElement(names)
  };
};

const genPhoto = () => {
  const idPhoto = genPhotoId();
  return {
    id: idPhoto,
    url: `photos/${idPhoto}.jpg`,
    description: `Тут будет описание ${idPhoto} фотографии`,
    likes: rnd(MIN_CNT_LIKES, MAX_CNT_LIKES),
    comments: Array.from({length: rnd(MIN_CNT_MESSAGE, MAX_CNT_MESSAGE)}, genComment)
  };
};

const GenPhotos = (cnt) => Array.from({length: cnt}, genPhoto);

GenPhotos(CNT_PHOTOS);
