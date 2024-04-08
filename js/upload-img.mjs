import {isEscapeKey} from './utils.mjs';
import {URL_SERVER, sendData} from './data-module.mjs';
import {showUploadError, showUploadSuccess } from './show-message.mjs';

const uploadForm = document.querySelector('.img-upload__form');
const imgInput = uploadForm.querySelector('.img-upload__input');
const imgEditForm = uploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgEditForm.querySelector('.img-upload__preview').querySelector('img');
const btnCloseForm = imgEditForm.querySelector('.img-upload__cancel');

const viewScale = imgEditForm.querySelector('.scale__control--value');
const btnScaleMinus = imgEditForm.querySelector('.scale__control--smaller');
const btnScalePlus = imgEditForm.querySelector('.scale__control--bigger');
const ScaleImg = {
  INIT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100,
  value: 100
};

const effectList = imgEditForm.querySelectorAll('input[type=radio][name=effect]');
const sliderContainer = imgEditForm.querySelector('.img-upload__effect-level');
const sliderElement = imgEditForm.querySelector('.effect-level__slider');
const effectLevel = imgEditForm.querySelector('.effect-level__value');
const EFFECT_IMG_INIT = 'none';
const Effects = {
  chrome: {filter: 'grayscale', minValue: 0, maxValue:1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', minValue: 0, maxValue:1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', minValue: 0, maxValue:100, step: 1, unit: '%'},
  phobos: {filter: 'blur', minValue: 0, maxValue:3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', minValue: 0, maxValue:3, step: 0.1, unit: ''}
};

const FIELD_VALIDATE_STYLE = 'img-upload__field-wrapper';

const hashtagsInput = imgEditForm.querySelector('.text__hashtags');
const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MAX_LENGTH = 20;

const descriptionInput = imgEditForm.querySelector('.text__description');
const DESCRIPTION_MAX_LENGTH = 140;

const pristine = new Pristine(uploadForm, {
  classTo: FIELD_VALIDATE_STYLE,
  errorClass: `${FIELD_VALIDATE_STYLE}--invalid`,
  successClass: `${FIELD_VALIDATE_STYLE}--valid`,
  errorTextParent: FIELD_VALIDATE_STYLE,
  errorTextTag: 'div',
  errorTextClass: `${FIELD_VALIDATE_STYLE}--error`
});

const setScaleImg = (scaleValue) => {
  viewScale.value = `${scaleValue}%`;
  btnScaleMinus.disabled = scaleValue === ScaleImg.MIN;
  btnScalePlus.disabled = scaleValue === ScaleImg.MAX;
  imgPreview.style.transform = `scale(${scaleValue / ScaleImg.MAX})`;
  ScaleImg.value = scaleValue;
};

const changeImgEffect = (effectValue) => {
  if (effectValue === 'none') {
    sliderContainer.classList.add('hidden');
    imgPreview.style.filter = '';
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Effects[effectValue].minValue,
        max: Effects[effectValue].maxValue,
      },
      start: Effects[effectValue].maxValue,
      step: Effects[effectValue].step,
    });
  }
};

const initImgEffect = (effectValue) => {
  const effectElement = imgEditForm.querySelector(`input[type=radio][name=effect][value=${effectValue}]`);
  effectElement.checked = true;
  changeImgEffect(effectValue);
};

const setImgEffect = (effectName, effectValue) => {
  if (effectName === 'none') {
    imgPreview.style.filter = '';
  } else {
    imgPreview.style.filter = `${Effects[effectName].filter}(${effectValue}${Effects[effectName].unit})`;
  }
};

const validateHashtagsCount = (value) => {
  const hashtags = value.toUpperCase().split(' ').filter(Boolean);
  return hashtags.length <= HASHTAGS_MAX_COUNT;
};

const validateHashtagsDublicate = (value) => {
  const hashtags = value.toUpperCase().split(' ').filter(Boolean);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagsValid = (value) => {
  const hashtagMask = new RegExp(`^(#[a-zа-яё0-9]{1,${HASHTAGS_MAX_LENGTH - 1}}\\s*)*$`, 'i');
  return hashtagMask.test(value);
};

pristine.addValidator(hashtagsInput, validateHashtagsCount, 'Превышено количество хэштегов', 1, false);
pristine.addValidator(hashtagsInput, validateHashtagsDublicate, 'Хэштеги повторяются', 2, false);
pristine.addValidator(hashtagsInput, validateHashtagsValid, 'Введён невалидный хэштег', 3, false);

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;
pristine.addValidator(descriptionInput, validateDescription, `Комментарий не должен превышать ${DESCRIPTION_MAX_LENGTH} символов`);

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt) && !['hashtags', 'description'].includes(evt.target.name)) {
    evt.preventDefault();
    closeImageEdit();
  }
};

const onBtnScaleClick = (evt) => {
  switch (evt.target) {
    case btnScaleMinus:
      ScaleImg.value -= ScaleImg.STEP;
      break;
    case btnScalePlus:
      ScaleImg.value += ScaleImg.STEP;
      break;
    default:
      ScaleImg.value = ScaleImg.INIT;
  }
  setScaleImg(ScaleImg.value);
};

const onEffectClick = (evt) => {
  changeImgEffect(evt.target.value);
};

const onSliderUpdate = () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  setImgEffect(imgEditForm.querySelector('input[type=radio][name=effect]:checked').value, effectLevel.value);
};

const initUploadForm = () => {
  setScaleImg(ScaleImg.INIT);
  initImgEffect(EFFECT_IMG_INIT);
  setImgEffect(EFFECT_IMG_INIT, effectLevel.value);
  hashtagsInput.value = '';
  pristine.validate();
  descriptionInput.value = '';
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(new FormData(evt.target))
      .then(showUploadSuccess)
      .then(closeImageEdit)
      .catch(showUploadError);
  }
};

function closeImageEdit () {
  imgInput.value = '';
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  btnCloseForm.removeEventListener('click', closeImageEdit);

  btnScaleMinus.removeEventListener('click', onBtnScaleClick);
  btnScalePlus.removeEventListener('click', onBtnScaleClick);
  viewScale.removeEventListener('click',onBtnScaleClick);

  effectList.forEach((effect) => {
    effect.removeEventListener('click', onEffectClick);
  });
  sliderElement.noUiSlider.off();

  uploadForm.removeEventListener('submit', onUploadFormSubmit);
}

const openImageEdit = (evt) => {
  document.addEventListener('keydown', onDocumentKeyDown);
  btnCloseForm.addEventListener('click', closeImageEdit);

  btnScaleMinus.addEventListener('click', onBtnScaleClick);
  btnScalePlus.addEventListener('click', onBtnScaleClick);
  viewScale.addEventListener('click',onBtnScaleClick);

  effectList.forEach((effect) => {
    effect.addEventListener('click', onEffectClick);
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);

  uploadForm.addEventListener('submit', onUploadFormSubmit);

  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
  imgEditForm.querySelectorAll('.effects__preview').forEach((effect) => {
    effect.setAttribute('style', `background-image: url("${URL.createObjectURL(evt.target.files[0])}")`);
  });
  initUploadForm();
  imgEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

imgInput.addEventListener('change', openImageEdit);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 0,
  },
  step: 0,
  start: 0,
  connect: 'lower'
});

uploadForm.setAttribute('method', 'post');
uploadForm.setAttribute('enctype', 'multipart/form-data');
uploadForm.setAttribute('action', URL_SERVER);

