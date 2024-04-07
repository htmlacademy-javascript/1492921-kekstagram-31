const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const classPictureImg = 'picture__img';
const classPictureLikes = 'picture__likes';
const classPictureCommentsCountTotal = 'picture__comments';

const renderPhoto = ({url, description, likes, comments}, onClick) => {
  const element = photoTemplate.cloneNode(true);
  const pictureImg = element.querySelector(`.${classPictureImg}`);
  pictureImg.src = url;
  pictureImg.alt = description;
  element.querySelector(`.${classPictureLikes}`).textContent = likes;
  element.querySelector(`.${classPictureCommentsCountTotal}`).textContent = comments.length;
  pictureImg.addEventListener('click', () => {
    onClick({url, description, likes, comments});
  });
  return element;
};

const renderPhotos = (photos, onPhotoClick) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo, onPhotoClick));
  });
  photosContainer.append(fragment);
};

export {renderPhotos};

