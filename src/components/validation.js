function showError(input, form, settings) {
  const spanId = `error-${input.id}`;
  const errorField = form.querySelector(`#${spanId}`);
  input.classList.add(settings.inputErrorClass);
  errorField.textContent = input.validationMessage;
}

function hideError(input, form, settings) {
  const spanId = `error-${input.id}`;
  const errorField = form.querySelector(`#${spanId}`);
  input.classList.remove(settings.inputErrorClass);
  errorField.textContent = "";
}

function checkValid(input, form, settings) {
  if (input.validity.valid) {
    hideError(input, form, settings);
  } else {
    showError(input, form, settings);
  }
}

function checkFormValidity(form, submitButton) {
  if (form.checkValidity()) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

export function enableButton(submitButton) {
  submitButton.disabled = false;
}

function disableButton(submitButton) {
  submitButton.disabled = true;
}

function setEventListeners(form, settings) {
  const inputList = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.buttonSelector);
  checkFormValidity(form, submitButton);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkValid(input, form, settings);
      checkFormValidity(form, submitButton);
    });
  });
}

export function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}
