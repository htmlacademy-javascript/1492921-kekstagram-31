import {getData} from './data-module.mjs';
import {showBigPhoto} from './big-photo.mjs';
import {renderPhotos} from './render-photos.mjs';
import {showloadError} from './show-message.mjs';
import {showFilters} from './filter-photo.mjs';


getData()
  .then((photos) => {
    renderPhotos(photos, showBigPhoto);
  })
  .then(showFilters)
  .catch(showloadError);

//renderPhotos(photos, showBigPhoto);
