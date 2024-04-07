import {COMMENTS_MAX_COUNT_VIEW} from './const.mjs';
import {isEscapeKey} from './utils.mjs';
import {getComments} from './data-module.mjs';
import {bigPhoto, btnCloseBigPhoto, btnNextComments, renderBigPhoto, renderComments} from './render-big-photo.mjs';

let commentsCountShown = 0;
let onBtnNextCommentsClick;

const showComments = (photo) => {
  const commentsView = getComments(photo, commentsCountShown, COMMENTS_MAX_COUNT_VIEW);
  commentsCountShown += commentsView.length;
  renderComments(commentsView);
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const onBtnCloseBigPhotoClick = () => {
  closeBigPhoto();
};

function closeBigPhoto () {
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  btnNextComments.removeEventListener('click', onBtnNextCommentsClick);
  btnCloseBigPhoto.removeEventListener('click', onBtnCloseBigPhotoClick);
}

function showBigPhoto(photo) {

  onBtnNextCommentsClick = () => {
    showComments(photo);
  };

  renderBigPhoto(photo);
  commentsCountShown = 0;
  showComments(photo);
  document.addEventListener('keydown', onDocumentKeyDown);
  btnCloseBigPhoto.addEventListener('click', onBtnCloseBigPhotoClick);
  btnNextComments.addEventListener('click', onBtnNextCommentsClick);
  document.body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
}

export {showBigPhoto};
