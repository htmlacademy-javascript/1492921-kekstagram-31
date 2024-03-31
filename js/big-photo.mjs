import {COMMENTS_MAX_COUNT_VIEW} from './const.mjs';
import {isEscapeKey} from './utils.mjs';
import {getComments} from './data-module.mjs';
import {bigPicture, btnBigPictureCancel, bigPictureCommentsCount, renderBigPhoto, renderComments, bigPictureCommentsLoadNext} from './render-data.mjs';

let commentsCountShown = 0;
let onClickCommentNext;

const showComments = (photo) => {
  const commentsView = getComments(photo, commentsCountShown, COMMENTS_MAX_COUNT_VIEW);
  commentsCountShown += commentsView.length;
  renderComments(commentsView, commentsCountShown);
  return function () {};
};

const onKeyDownDocument = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

function closeBigPhoto () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyDownDocument);
  bigPictureCommentsLoadNext.removeEventListener('click', onClickCommentNext);
  btnBigPictureCancel.removeEventListener('click', closeBigPhoto);
}

function showBigPhoto(evt, photo) {

  onClickCommentNext = (event) => {
    event.preventDefault();
    showComments(photo);
  };

  evt.preventDefault();
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderBigPhoto(photo);
  if (photo.comments.length > 0) {
    bigPictureCommentsLoadNext.classList.remove('hidden');
    bigPictureCommentsCount.classList.remove('hidden');
    bigPictureCommentsLoadNext.addEventListener('click', onClickCommentNext);
    commentsCountShown = 0;
  } else {
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoadNext.classList.add('hidden');
  }
  showComments(photo);
  document.addEventListener('keydown', onKeyDownDocument);
  btnBigPictureCancel.addEventListener('click', closeBigPhoto);
}

export {showBigPhoto};
