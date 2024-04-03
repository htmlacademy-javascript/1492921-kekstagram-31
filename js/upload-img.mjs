import {isEscapeKey} from './utils.mjs';

const URL_SERVER = 'https://31.javascript.htmlacademy.pro/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const imgInput = uploadForm.querySelector('.img-upload__input');
const imgEditForm = uploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgEditForm.querySelector('.img-upload__preview').querySelector('img');
const btnFormClose = imgEditForm.querySelector('.img-upload__cancel');

const viewScale = imgEditForm.querySelector('.scale__control--value');
const btnScaleMinus = imgEditForm.querySelector('.scale__control--smaller');
const btnScalePlus = imgEditForm.querySelector('.scale__control--bigger');
const SCALE_IMG_STEP = 25;
const SCALE_IMG_INIT = 100;
const SCALE_IMG_MIN = 25;
const SCALE_IMG_MAX = 100;
let scaleStyle;

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
let effectStyle = '';

const FIELD_VALIDATE_STYLE = 'img-upload__field-wrapper';

const hashtagsInput = imgEditForm.querySelector('.text__hashtags');

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

const setImgScale = (scaleValue) => {
  viewScale.value = `${scaleValue}%`;
  btnScaleMinus.disabled = scaleValue === SCALE_IMG_MIN;
  btnScalePlus.disabled = scaleValue === SCALE_IMG_MAX;
  scaleStyle = `transform: scale(${scaleValue / SCALE_IMG_MAX})`;
  imgPreview.setAttribute('style', `${scaleStyle}; ${effectStyle}`);
};

const changeImgEffect = (effectValue) => {
  if (effectValue === 'none') {
    sliderContainer.classList.add('hidden');
    imgPreview.setAttribute('style', scaleStyle);
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
    effectStyle = '';
  } else {
    effectStyle = `filter: ${Effects[effectName].filter}(${effectValue}${Effects[effectName].unit})`;
  }
  imgPreview.setAttribute('style', `${scaleStyle}; ${effectStyle}`);
};

const validateHashtags = (value) => {
  const hashtagMask = /^(#[a-zа-яё0-9]{1,19}\s*){0,5}$/i;
  const hashtags = String(value).split(' ').filter(Boolean);
  return hashtagMask.test(value) && (hashtags.length === new Set(hashtags).size);
};
pristine.addValidator(hashtagsInput, validateHashtags, 'Разрешено не более 5-ти уникальных #хэштегов из букв и цифр,<br>разделенных пробелами');

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;
pristine.addValidator(descriptionInput, validateDescription, `Комментарий не должен превышать ${DESCRIPTION_MAX_LENGTH} символов`);

const onKeyDownDocument = (evt) => {
  if (isEscapeKey(evt) && !['hashtags', 'description'].includes(evt.target.name)) {
    evt.preventDefault();
    closeImageEdit();
  }
};

const onChangeScaleImg = (evt) => {
  let scaleImg = parseInt(viewScale.value, 10);
  if (evt.target.textContent === 'Уменьшить') {
    scaleImg -= SCALE_IMG_STEP;
  } else if (evt.target.textContent === 'Увеличить') {
    scaleImg += SCALE_IMG_STEP;
  } else {
    scaleImg = SCALE_IMG_INIT;
  }
  setImgScale(scaleImg);
};

const onClickEffect = (evt) => {
  changeImgEffect(evt.target.value);
};

const onUpdateSlider = () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  setImgEffect(imgEditForm.querySelector('input[type=radio][name=effect]:checked').value, effectLevel.value);
};

const onSubmitUploadForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function closeImageEdit () {
  imgInput.value = '';
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeyDownDocument);
  btnFormClose.removeEventListener('click', closeImageEdit);

  btnScaleMinus.removeEventListener('click', onChangeScaleImg);
  btnScalePlus.removeEventListener('click', onChangeScaleImg);
  viewScale.removeEventListener('click',onChangeScaleImg);

  effectList.forEach((effect) => {
    effect.removeEventListener('click', onClickEffect);
  });
  sliderElement.noUiSlider.off();

  uploadForm.removeEventListener('submit', onSubmitUploadForm);
}

const openImageEdit = (evt) => {
  imgEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDownDocument);
  btnFormClose.addEventListener('click', closeImageEdit);

  btnScaleMinus.addEventListener('click', onChangeScaleImg);
  btnScalePlus.addEventListener('click', onChangeScaleImg);
  viewScale.addEventListener('click',onChangeScaleImg);

  effectList.forEach((effect) => {
    effect.addEventListener('click', onClickEffect);
  });

  sliderElement.noUiSlider.on('update', onUpdateSlider);

  uploadForm.addEventListener('submit', onSubmitUploadForm);

  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
  imgEditForm.querySelectorAll('.effects__preview').forEach((effect) => {
    effect.setAttribute('style', `background-image: url("${URL.createObjectURL(evt.target.files[0])}")`);
  });

  setImgScale(SCALE_IMG_INIT);

  initImgEffect(EFFECT_IMG_INIT);
  setImgEffect(EFFECT_IMG_INIT, effectLevel.value);
  hashtagsInput.value = '';
  pristine.validate();
  descriptionInput.value = '';

  //hashtagsInput.focus();
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

//descriptionInput.setAttribute('maxlength', DESCRIPTION_MAX_LENGTH);

