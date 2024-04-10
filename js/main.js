import {getData} from './data-module.mjs';
import {debounceRenderPhotos} from './render-photos.mjs';
import {showloadError} from './show-message.mjs';
import {showFilters} from './filter-photo.mjs';

getData()
  .then((photoCollection) => {
    debounceRenderPhotos(photoCollection);
  })
  .then(showFilters)
  .catch(showloadError);

