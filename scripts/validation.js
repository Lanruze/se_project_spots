const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__form_type_disable",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg, settings) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(settings.errorClass);
  inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (formEl, inputEl, settings) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(settings.errorClass);
  inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (buttonEl, settings) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(settings.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, settings);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(settings.inactiveButtonClass);
  }
};

//optional
//const resetValidation = (formEl, inputList) => {
//inputList.forEach((input) => {
//hideInputError(formEl, input);
//});
//};

const setEventListeners = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

  //console.log(inputList);
  //console.log(buttonElement);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formEl, settings);
  });
};

enableValidation(settings);
