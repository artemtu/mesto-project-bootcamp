export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

let originalButtonText;

export function showLoadingStatus(button) {
  originalButtonText = button.textContent;
  button.textContent = "Сохранение...";
}

export function resetForm(form) {
  form.reset();
}

export function resetButtonText(button) {
  button.textContent = originalButtonText;
}
