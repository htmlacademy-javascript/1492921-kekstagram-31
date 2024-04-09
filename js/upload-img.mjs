import {isEscapeKey} from './utils.mjs';
import {URL_SERVER, sendData} from './data-module.mjs';
import {showUploadError, showUploadSuccess } from './show-message.mjs';

const uploadForm = document.querySelector('.img-upload__form');
const imgInput = uploadForm.querySelector('.img-upload__input');
const imgEditForm = uploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgEditForm.querySelector('.img-upload__preview').querySelector('img');
const btnSubmit = uploadForm.querySelector('.img-upload__submit');
const btnCloseForm = imgEditForm.querySelector('.img-upload__cancel');

const viewScale = imgEditForm.querySelector('.scale__control--value');
const btnScaleMinus = imgEditForm.querySelector('.scale__control--smaller');
const btnScalePlus = imgEditForm.querySelector('.scale__control--bigger');
const ScaleImg = {
  INIT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};
let scaleImgValue = ScaleImg.INIT;

const effectList = imgEditForm.querySelectorAll('input[type=radio][name=effect]');
const sliderContainer = imgEditForm.querySelector('.img-upload__effect-level');
const sliderElement = imgEditForm.querySelector('.effect-level__slider');
const effectLevel = imgEditForm.querySelector('.effect-level__value');
const Effects = {
  CHROME: {filter: 'grayscale', minValue: 0, maxValue:1, step: 0.1, unit: ''},
  SEPIA: {filter: 'sepia', minValue: 0, maxValue:1, step: 0.1, unit: ''},
  MARVIN: {filter: 'invert', minValue: 0, maxValue:100, step: 1, unit: '%'},
  PHOBOS: {filter: 'blur', minValue: 0, maxValue:3, step: 0.1, unit: 'px'},
  HEAT: {filter: 'brightness', minValue: 0, maxValue:3, step: 0.1, unit: ''}
};
const EFFECT_IMG_INIT = 'NONE';

const CLASS_FIELD_VALIDATE = 'img-upload__field-wrapper';

const hashtagsInput = imgEditForm.querySelector('.text__hashtags');
const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MAX_LENGTH = 20;

const descriptionInput = imgEditForm.querySelector('.text__description');
const DESCRIPTION_MAX_LENGTH = 140;

const pristine = new Pristine(uploadForm, {
  classTo: CLASS_FIELD_VALIDATE,
  errorClass: `${CLASS_FIELD_VALIDATE}--invalid`,
  successClass: `${CLASS_FIELD_VALIDATE}--valid`,
  errorTextParent: CLASS_FIELD_VALIDATE,
  errorTextTag: 'div',
  errorTextClass: `${CLASS_FIELD_VALIDATE}--error`
});

const setScaleImg = (scaleValue) => {
  viewScale.value = `${scaleValue}%`;
  btnScaleMinus.disabled = scaleValue === ScaleImg.MIN;
  btnScalePlus.disabled = scaleValue === ScaleImg.MAX;
  imgPreview.style.transform = `scale(${(scaleValue / ScaleImg.MAX).toFixed(2)}`;
};

const changeImgEffect = (effectName) => {
  if (effectName === 'NONE') {
    sliderContainer.classList.add('hidden');
    imgPreview.style.filter = '';
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Effects[effectName].minValue,
        max: Effects[effectName].maxValue,
      },
      start: Effects[effectName].maxValue,
      step: Effects[effectName].step,
    });
  }
};

const initImgEffect = (effectName) => {
  const effectElement = imgEditForm.querySelector(`input[type=radio][name=effect][value=${effectName.toLowerCase()}]`);
  effectElement.checked = true;
  changeImgEffect(effectName);
};

const setImgEffect = (effectName, effectValue) => {
  if (effectName === 'NONE') {
    imgPreview.style.filter = '';
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
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
  if (evt.target.disabled) {
    return;
  }
  switch (evt.target) {
    case btnScaleMinus:
      scaleImgValue -= ScaleImg.STEP;
      break;
    case btnScalePlus:
      scaleImgValue += ScaleImg.STEP;
      break;
    default:
      scaleImgValue = ScaleImg.INIT;
  }
  setScaleImg(scaleImgValue);
};

const onEffectClick = (evt) => {
  changeImgEffect(evt.target.value.toUpperCase());
};

const onSliderUpdate = () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  setImgEffect(imgEditForm.querySelector('input[type=radio][name=effect]:checked').value.toUpperCase(), effectLevel.value);
};

const initUploadForm = () => {
  scaleImgValue = ScaleImg.INIT;
  setScaleImg(scaleImgValue);
  initImgEffect(EFFECT_IMG_INIT);
  setImgEffect(EFFECT_IMG_INIT, effectLevel.value);
  hashtagsInput.value = '';
  pristine.reset();
  descriptionInput.value = '';
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    btnSubmit.disabled = true;
    sendData(new FormData(evt.target))
      .then(showUploadSuccess)
      .then(closeImageEdit)
      .catch(showUploadError)
      .finally(() => {
        btnSubmit.disabled = false;
      });
  }
};

function closeImageEdit () {
  imgInput.value = '';
  initUploadForm();
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

  const urlFile = URL.createObjectURL(evt.target.files[0]);
  imgPreview.src = urlFile;
  imgEditForm.querySelectorAll('.effects__preview').forEach((effect) => {
    effect.setAttribute('style', `background-image: url("${urlFile}")`);
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
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

uploadForm.setAttribute('method', 'post');
uploadForm.setAttribute('enctype', 'multipart/form-data');
uploadForm.setAttribute('action', URL_SERVER);

