const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const btnBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsCountTotal = bigPictureCommentsCount.querySelector('.social__comment-total-count');
const bigPictureCommentsCountShow = bigPictureCommentsCount.querySelector('.social__comment-shown-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoadNext = bigPicture.querySelector('.comments-loader');

const classComment = 'social__comment';
const classCommentAvatar = 'social__picture';
const classCommentText = 'social__text';
const commentsFragment = document.createDocumentFragment();

const classPictureImg = 'picture__img';
const classPictureLikes = 'picture__likes';
const classPictureCommentsCountTotal = 'picture__comments';

const renderBigPhoto = ({url, description, likes, comments}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureCaption.textContent = description;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCountTotal.textContent = comments.length;
  // Очистка комментариев
  bigPictureCommentsContainer.replaceChildren();
  //bigPicture.dataset.idPhoto = photo.id;
};

const renderPhoto = ({url, description, likes, comments}, onClick) => {
  const element = pictureTemplate.cloneNode(true);
  const pictureImg = element.querySelector(`.${classPictureImg}`);
  pictureImg.src = url;
  pictureImg.alt = description;
  element.querySelector(`.${classPictureLikes}`).textContent = likes;
  element.querySelector(`.${classPictureCommentsCountTotal}`).textContent = comments.length;
  pictureImg.addEventListener('click', (evt) => {
    onClick(evt, {url, description, likes, comments});
  });
  //element.dataset.idPhoto = photo.id;
  return element;
};

const renderPhotos = (photos, onClick) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo, onClick));
  });
  picturesContainer.append(fragment);
};

const renderComment = ({avatar, message, name}) => {
  const element = document.createElement('li');
  element.classList.add(classComment);
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add(classCommentAvatar);
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  element.append(commentAvatar);
  const commentText = document.createElement('p');
  commentText.classList.add(classCommentText);
  commentText.textContent = message;
  element.append(commentText);
  //element.dataset.idComment = id;
  return element;
};

const renderNoComments = () => {
  const element = document.createElement('li');
  element.classList.add(classComment);
  const commentText = document.createElement('p');
  commentText.classList.add(classCommentText);
  commentText.textContent = 'Комментарии отсутствуют';
  element.append(commentText);
  return element;
};

const renderComments = (commentsShow, commentsCountShow) => {
  commentsFragment.innerHTML = '';
  if (commentsCountShow === 0) {
    commentsFragment.append(renderNoComments());
  } else {
    commentsShow.forEach((comment) => {
      commentsFragment.append(renderComment(comment));
    });
  }
  bigPictureCommentsCountShow.textContent = commentsCountShow;
  bigPictureCommentsContainer.append(commentsFragment);
  if (bigPictureCommentsCountShow.textContent === bigPictureCommentsCountTotal.textContent) {
    bigPictureCommentsLoadNext.classList.add('hidden');
  }
};

export {renderPhotos, renderBigPhoto, renderComments};
export {bigPicture, btnBigPictureCancel, bigPictureCommentsCount, bigPictureCommentsLoadNext};
