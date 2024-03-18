const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');

const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsCountTotal = bigPictureCommentsCount.querySelector('.social__comment-total-count');
const bigPictureCommentsCountShow = bigPictureCommentsCount.querySelector('.social__comment-shown-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoadNext = bigPicture.querySelector('.social__comments-loader');

const classComment = 'social__comment';
const classCommentAvatar = 'social__picture';
const classCommentText = 'social__text';

const classPictureImg = 'picture__img';
const classPictureLikes = 'picture__likes';
const classPictureCommentsCountTotal = 'picture__comments';

const renderBigPhoto = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureCaption.textContent = photo.description;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCommentsCountTotal.textContent = photo.comments.length;
  bigPicture.dataset.idPhoto = photo.id;
};

const renderPhoto = (photo, element) => {
  const pictureImg = element.querySelector(`.${classPictureImg}`);
  pictureImg.src = photo.url;
  pictureImg.alt = photo.description;
  element.querySelector(`.${classPictureLikes}`).textContent = photo.likes;
  element.querySelector(`.${classPictureCommentsCountTotal}`).textContent = photo.comments.length;
  element.dataset.idPhoto = photo.id;
  return element;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo, pictureTemplate.cloneNode(true)));
  });
  picturesContainer.append(fragment);
};

const renderComment = (comment) => {
  const element = document.createElement('li');
  element.classList.add(classComment);
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add(classCommentAvatar);
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  element.append(commentAvatar);
  const commentText = document.createElement('p');
  commentText.classList.add(classCommentText);
  commentText.textContent = comment.message;
  element.append(commentText);
  element.dataset.idComment = comment.id;
  return element;
};

const renderComments = (comments, CommentsCountShow) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(renderComment(comment));
  });
  bigPictureCommentsContainer.replaceChildren(fragment);
  bigPictureCommentsCountShow.textContent = CommentsCountShow;
};

export {picturesContainer, bigPicture, bigPictureCommentsCount, renderPhoto, renderPhotos, renderBigPhoto, renderComments, bigPictureCommentsLoadNext};
