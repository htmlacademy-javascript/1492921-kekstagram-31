import {isEscapeKey} from './utils.mjs';
import {getComments, getPhoto} from './data-module.mjs';
import {picturesContainer, bigPicture, renderBigPhoto, bigPictureCommentsCount, renderComments, bigPictureCommentsLoadNext} from './render-data.mjs';

const btnBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let commentsCountShown;
let photo;

const showComments = () => {
  const commentsView = getComments(photo);
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
    commentsCountShown = 0;
    showComments();
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoadNext.classList.add('hidden');
  } else {
    evt.preventDefault();
  }
});

btnBigPictureCancel.addEventListener('click', closeBigPhoto);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPhoto();
  }
});

