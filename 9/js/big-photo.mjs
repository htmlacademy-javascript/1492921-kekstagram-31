import {COMMENTS_MAX_COUNT_VIEW} from './const.mjs';
import {isEscapeKey} from './utils.mjs';
import {getComments, getPhoto} from './data-module.mjs';
import {picturesContainer, bigPicture, renderBigPhoto, renderComments, bigPictureCommentsLoadNext} from './render-data.mjs';

const btnBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let commentsCountShown = 0;
let photo;

const showComments = () => {
  const commentsView = getComments(photo, commentsCountShown, COMMENTS_MAX_COUNT_VIEW);
  commentsCountShown += commentsView.length;
  renderComments(commentsView, commentsCountShown);
};

const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

picturesContainer.addEventListener('click', (evt) => {
  // Т.к.обрабочик стоит на всем контейнере с фотографиями то обработчик  будет срабатывать на лайках и комментариях тоже
  // поэтому проверяем, что клик был именно на фото
  if (evt.target.classList.contains('picture__img')) {
    document.body.classList.add('modal-open');

    photo = getPhoto(evt.target.parentElement.dataset.idPhoto);
    bigPicture.classList.remove('hidden');
    renderBigPhoto(photo);
    bigPictureCommentsLoadNext.classList.remove('hidden');
    commentsCountShown = 0;
    showComments();
  } else {
    evt.preventDefault();
  }
});

bigPictureCommentsLoadNext.addEventListener('click', showComments);
btnBigPictureCancel.addEventListener('click', closeBigPhoto);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPhoto();
  }
});

