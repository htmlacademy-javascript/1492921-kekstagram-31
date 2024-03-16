import {isEscapeKey} from './utils.mjs';
import {getPhoto} from './data-module.mjs';
import {renderPhoto, renderComments} from './render-data.mjs';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const btnBigPictureCancel = document.querySelector('.big-picture__cancel');

const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

pictures.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    bigPicture.classList.remove('hidden');
    const photo = getPhoto(evt.target.parentElement.dataset.idPhoto);
    renderPhoto(photo, bigPicture, 'big-picture__img', 'likes-count', 'social__comment-total-count');
    // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
    document.body.classList.add('modal-open');
    // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
    renderComments(photo.comments, document.querySelector('.social__comments'));
    // Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count
    bigPicture.querySelector('.social__comment-shown-count').textContent = bigPicture.querySelector('.social__comments').childElementCount;
    // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
    // добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  }
});

btnBigPictureCancel.addEventListener('click', closeBigPhoto);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPhoto();
  }
});
