import { popupLists } from "../components/script.js";

export function openPopup(popup, popupContainer) {
  popup.classList.add("popup__container_active");

}

export function closePopup(popup) {
  popup.classList.remove("popup__container_active");
}

export function closePopupOverlay(popupSection) {
  popupLists.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closePopup(popupSection);
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
