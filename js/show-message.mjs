import {isEscapeKey} from './utils.mjs';

const SECONDS_AUTO_CLOSE_MESSAGE = 5;

let formMessage;

const errorLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');

const onBodyKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    closeMessage();
  }
};

const onFormMessageClick = (evt) => {
  evt.stopPropagation();
};

const onOutFormMessageClick = () => {
  closeMessage();
};

const onBtnCloseClick = () => {
  closeMessage();
};

function closeMessage () {
  document.body.removeEventListener('keydown', onBodyKeyDown);
  const btnClose = formMessage.querySelector('button');
  if (btnClose) {
    btnClose.removeEventListener('click', onBtnCloseClick);
  }
  const divInner = formMessage.querySelector('div');
  if (divInner) {
    formMessage.removeEventListener('click', onOutFormMessageClick);
    divInner.removeEventListener('click', onFormMessageClick);
  } else {
    document.body.removeEventListener('click', onOutFormMessageClick);
    formMessage.removeEventListener('clock', onFormMessageClick);
  }
  formMessage.remove();
}

const showLoadMessage = (autoCloseSeconds = SECONDS_AUTO_CLOSE_MESSAGE) => {
  formMessage = errorLoadTemplate.cloneNode(true);
  document.body.append(formMessage);
  document.body.addEventListener('keydown', onBodyKeyDown);
  setTimeout(closeMessage, autoCloseSeconds * 1000);
  formMessage.addEventListener('click', onFormMessageClick);
  document.body.addEventListener('click', onOutFormMessageClick);
};

const showUploadMessage = (template) => {
  formMessage = template.cloneNode(true);
  document.body.append(formMessage);
  document.body.addEventListener('keydown', onBodyKeyDown);
  formMessage.querySelector('button').addEventListener('click', onBtnCloseClick);
  formMessage.querySelector('div').addEventListener('click', onFormMessageClick);
  formMessage.addEventListener('click', onOutFormMessageClick);
};

const showloadError = () => showLoadMessage(SECONDS_AUTO_CLOSE_MESSAGE);
const showUploadError = () => showUploadMessage(errorUploadTemplate);
const showUploadSuccess = () => showUploadMessage(successUploadTemplate);

export {showloadError, showUploadError, showUploadSuccess};

