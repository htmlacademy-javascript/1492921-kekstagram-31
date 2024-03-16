const renderPhoto = (photo, element, classImg = 'picture__img', classLikes = 'picture__likes' , classComments = 'picture__comments') => {
  let newPhotoImg = element.querySelector(`.${classImg}`);
  if (classImg !== 'picture__img') {
    newPhotoImg = newPhotoImg.querySelector('img');
  }
  newPhotoImg.src = photo.url;
  newPhotoImg.alt = photo.description;
  element.querySelector(`.${classLikes}`).textContent = photo.likes;
  element.querySelector(`.${classComments}`).textContent = photo.comments.length;
  element.dataset.idPhoto = photo.id;
  return element;
};

const renderPhotos = (photos, container, templateId = 'picture') => {
  const pictureTemplate = document.querySelector(`#${templateId}`).content.querySelector(`.${templateId}`);
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo, pictureTemplate.cloneNode(true)));
  });
  container.append(fragment);
};

const renderComment = (comment, classComment = 'social__comment', classImg = 'social__picture', classTrxtComment = 'social__text') => {
  const element = document.createElement('li');
  element.classList.add(classComment);
  const imgElement = document.createElement('img');
  imgElement.classList.add(classImg);
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;
  element.append(imgElement);
  const pElement = document.createElement('p');
  pElement.classList.add(classTrxtComment);
  pElement.textContent = comment.message;
  element.append(pElement);
  element.dataset.idPhoto = comment.id;
  return element;
};

const renderComments = (comments, container) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(renderComment(comment));
  });
  container.replaceChildren(fragment);
};

export {renderPhoto, renderPhotos, renderComments};
