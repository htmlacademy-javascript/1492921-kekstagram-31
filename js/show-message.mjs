import {isEscapeKey} from './utils.mjs';

const SECONDS_AUTO_CLOSE_MESSAGE = 5;

const errorLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');

const showAlert = (template, autoCloseSeconds = SECONDS_AUTO_CLOSE_MESSAGE) => {
  const formMessage = template.cloneNode(true);
  document.body.append(formMessage);
  setTimeout(() => formMessage.remove(), autoCloseSeconds * 1000);
};

const showUploadMessage = (template) => {

  const formMessage = template.cloneNode(true);

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
    formMessage.remove();
  }

  document.body.append(formMessage);
  document.body.addEventListener('keydown', onBodyKeyDown);
  formMessage.querySelector('button').addEventListener('click', onBtnCloseClick);
  formMessage.querySelector('div').addEventListener('click', onFormMessageClick);
  formMessage.addEventListener('click', onOutFormMessageClick);
};

const showloadError = () => showAlert(errorLoadTemplate, SECONDS_AUTO_CLOSE_MESSAGE);
const showUploadError = () => showUploadMessage(errorUploadTemplate);
const showUploadSuccess = () => showUploadMessage(successUploadTemplate);

export {showloadError, showUploadError, showUploadSuccess};

