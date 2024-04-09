const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikes = bigPhoto.querySelector('.likes-count');
const bigPhotoCaption = bigPhoto.querySelector('.social__caption');
const btnCloseBigPhoto = bigPhoto.querySelector('.big-picture__cancel');

const commentsCounts = bigPhoto.querySelector('.social__comment-count');
const commentsCountTotal = commentsCounts.querySelector('.social__comment-total-count');
const commentsCountShow = commentsCounts.querySelector('.social__comment-shown-count');
const commentsList = bigPhoto.querySelector('.social__comments');
const btnNextComments = bigPhoto.querySelector('.comments-loader');
const commentTemplate = commentsList.querySelector('.social__comment');

const commentsFragment = document.createDocumentFragment();

const renderBigPhoto = ({url, description, likes, comments}) => {
  bigPhotoImg.src = url;
  bigPhotoImg.alt = description;
  bigPhotoCaption.textContent = description === '' ? 'К сожалению нет описания :-(' : description;
  bigPhotoLikes.textContent = likes;
  commentsCountTotal.textContent = comments.length;
  if (comments.length === 0) {
    btnNextComments.classList.add('hidden');
    commentsCounts.classList.add('hidden');
  } else {
    btnNextComments.classList.remove('hidden');
    commentsCounts.classList.remove('hidden');
  }
  // Очистка комментариев
  commentsList.replaceChildren();
};

const renderComment = ({avatar, message, name}) => {
  const element = commentTemplate.cloneNode(true);
  const commentAvatar = element.querySelector('img');
  const commentText = element.querySelector('p');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentText.textContent = message;
  return element;
};

const renderNoComments = () => {
  const element = commentTemplate.cloneNode(true);
  element.querySelector('img').remove();
  element.querySelector('p').textContent = 'Комментарии отсутствуют';
  return element;
};

const renderComments = (comments) => {
  commentsFragment.innerHTML = '';
  if (comments.length === 0) {
    commentsFragment.append(renderNoComments());
  } else {
    comments.forEach((comment) => {
      commentsFragment.append(renderComment(comment));
    });
  }
  commentsList.append(commentsFragment);
  commentsCountShow.textContent = commentsList.childElementCount;
  if (commentsCountShow.textContent === commentsCountTotal.textContent) {
    btnNextComments.classList.add('hidden');
  }
};

export {renderBigPhoto, renderComments};
export {bigPhoto, btnCloseBigPhoto, btnNextComments};
