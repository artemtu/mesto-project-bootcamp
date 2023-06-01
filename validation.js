function showError(input, form) {
  const spanId = `error-${input.id}`;
  const errorField = form.querySelector(`#${spanId}`);
  errorField.textContent = input.validationMessage;
}

function hideError(input, form) {
  const spanId = `error-${input.id}`;
  const errorField = form.querySelector(`#${spanId}`);
  errorField.textContent = "";
}

function checkValid(input, form) {
  if (input.validity.valid) {
    hideError(input, form);
  } else {
    showError(input, form);
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
      checkValid(input, form);
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
