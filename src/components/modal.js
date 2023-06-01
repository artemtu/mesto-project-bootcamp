import { popupLists } from "./script.js";

export function openPopup(popup, popupContainer) {
  popup.classList.add("popup__container_active");
  popupContainer.classList.add("popup__container_active");
}

export function closePopup(popup, popupContainer) {
  popup.classList.remove("popup__container_active");
  popupContainer.classList.remove("popup__container_active");
}

export function closePopupOverlay(popupSection, popupContainer) {
  popupLists.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closePopup(popupSection, popupContainer);
      }
    });
  });
}

export function closePopupEsc(popupSection, popupContainer) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popupSection, popupContainer);
    }
  });
}
