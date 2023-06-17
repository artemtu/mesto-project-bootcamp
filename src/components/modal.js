
export function openPopup(popup) {
  popup.classList.add("popup__container_active");
  document.addEventListener("keydown", closePopupByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup__container_active");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__container_active");
    closePopup(openedPopup);
  }
}



