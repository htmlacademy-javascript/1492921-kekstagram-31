const renderPhoto = (photo, template, classImg = '.picture__img', classLikes = '.picture__likes' , classComments = '.picture__comments') => {
  const newPhoto = template.cloneNode(true);
  const newPhotoImg = newPhoto.querySelector(classImg);
  newPhotoImg.src = photo.url;
  newPhotoImg.alt = photo.description;
  newPhoto.querySelector(classLikes).textContent = photo.likes;
  newPhoto.querySelector(classComments).textContent = photo.comments.length;
  return newPhoto;
};

const renderPhotos = (photos, container, templateId = 'picture') => {
  const pictureTemplate = document.querySelector(`#${templateId}`).content.querySelector(`.${templateId}`);
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo, pictureTemplate));
  });
  container.append(fragment);
};

export {renderPhoto, renderPhotos};
