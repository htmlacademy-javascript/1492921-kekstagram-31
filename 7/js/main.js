import {CNT_PHOTOS} from './const.mjs';
import {genPhotos} from './gen-data.mjs';
import {renderPhotos} from './render-data.mjs';

renderPhotos(genPhotos(CNT_PHOTOS));
