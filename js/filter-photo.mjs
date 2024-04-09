import {getPhotosDefault, getPhotosRandom, getPhotosDiscussed} from './data-module.mjs';
import {debounceRenderPhotos} from './render-photos.mjs';

import {COUNT_RANDOM_PHOTOS} from './const.mjs';

const filters = document.querySelector('.img-filters');
const filterDefault = filters.querySelector('#filter-default');
const filterRandom = filters.querySelector('#filter-random');
const filterDiscussed = filters.querySelector('#filter-discussed');

const CLASS_FILTER_ACTIVE = 'img-filters__button--active';

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

let fiterActive = filterDefault;

const applyFilter = (photos) => {
  debounceRenderPhotos(photos);
};

const onFilterChange = (evt) => {
  if (evt.target.type !== 'button' || fiterActive !== filterRandom && fiterActive === evt.target) {
    return;
  }
  if (fiterActive !== evt.target) {
    fiterActive.classList.toggle(CLASS_FILTER_ACTIVE);
    evt.target.classList.toggle(CLASS_FILTER_ACTIVE);
    fiterActive = evt.target;
  }
  let filteredPhoto = [];
  switch (evt.target) {
    case filterRandom:
      filteredPhoto = getPhotosRandom(COUNT_RANDOM_PHOTOS);
      break;
    case filterDiscussed:
      filteredPhoto = getPhotosDiscussed();
      break;
    default:
      filteredPhoto = getPhotosDefault();
  }
  applyFilter(filteredPhoto);
};

filters.addEventListener('click', onFilterChange);

export {showFilters};
