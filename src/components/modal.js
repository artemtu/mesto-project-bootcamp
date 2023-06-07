const popups = document.querySelectorAll(".popup");

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

// close popups when click overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__container_active")) {
      closePopup(popup);
    }
  });
});
