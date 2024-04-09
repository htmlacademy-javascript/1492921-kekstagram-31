import {getPhotosDefault, getPhotosRandom, getPhotosDiscussed} from './data-module.mjs';
import {renderPhotos} from './render-photos.mjs';
import {showBigPhoto} from './big-photo.mjs';

import {COUNT_RANDOM_PHOTOS, DEBOUNCE_DELAY} from './const.mjs';
import { debounce } from './utils.mjs';

const filters = document.querySelector('.img-filters');
const filterDefault = filters.querySelector('#filter-default');
const filterRandom = filters.querySelector('#filter-random');
const filterDiscussed = filters.querySelector('#filter-discussed');

const CLASS_FILTER_ACTIVE = 'img-filters__button--active';

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

let fiterActive = filterDefault;

const onFilterClick = (getPhotos) =>
  debounce((evt) => {
    fiterActive.classList.remove(CLASS_FILTER_ACTIVE);
    evt.target.classList.add(CLASS_FILTER_ACTIVE);
    renderPhotos(getPhotos(), showBigPhoto);
    fiterActive = evt.target;
  }, DEBOUNCE_DELAY);

filterDefault.addEventListener('click', onFilterClick(() => getPhotosDefault()));

filterRandom.addEventListener('click', onFilterClick(() => getPhotosRandom(COUNT_RANDOM_PHOTOS)));

filterDiscussed.addEventListener('click', onFilterClick(() => getPhotosDiscussed()));


export {showFilters};
