import {showBigPhoto} from './big-photo.mjs';
import {debounce} from './utils.mjs';
import {DEBOUNCE_DELAY} from './const.mjs';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const CLASS_PHOTO_IMG = 'picture__img';
const CLASS_PHOTO_LIKES = 'picture__likes';
const CLASS_PHOTO_COMMENTS_COUNT_TOTAL = 'picture__comments';

const renderPhoto = ({url, description, likes, comments}, onClick) => {
  const element = photoTemplate.cloneNode(true);
  const photoImg = element.querySelector(`.${CLASS_PHOTO_IMG}`);
  photoImg.src = url;
  photoImg.alt = description;
  element.querySelector(`.${CLASS_PHOTO_LIKES}`).textContent = likes;
  element.querySelector(`.${CLASS_PHOTO_COMMENTS_COUNT_TOTAL}`).textContent = comments.length;
  photoImg.addEventListener('click', () => {
    onClick({url, description, likes, comments});
  });
  return element;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo, showBigPhoto));
  });
  photosContainer.querySelectorAll('.picture').forEach((photo) => {
    photo.remove();
  });
  photosContainer.append(fragment);
};

const debounceRenderPhotos = debounce(renderPhotos, DEBOUNCE_DELAY);

export {debounceRenderPhotos};

