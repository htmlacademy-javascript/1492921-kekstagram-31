const renderPhotos = (photos) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const pictureNew = pictureTemplate.cloneNode(true);
    const pictureImg = pictureNew.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    pictureNew.querySelector('.picture__likes').textContent = photo.likes;
    pictureNew.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(pictureNew);
  });
  document.querySelector('.pictures').appendChild(fragment);
};

export {renderPhotos};
