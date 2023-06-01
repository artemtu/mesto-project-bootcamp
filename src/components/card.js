export const popupCardAdd = document.querySelector(".popup_add");
export const popupCardContainer = document.querySelector(".popup__container_add");
export const popupCardButton = document.querySelector(".profile__add-button");
export const popupCloseCard = document.querySelector(".popup-close-card");
export const popupCardForm = document.querySelector(".popup__card-form");
export const placeNameInput = document.getElementById("popup__inputs_place_name");
export const linkInput = document.getElementById("popup__inputs_place_link");

import { cardTemplate } from "./script.js";
import { popupCloseImage } from "./script.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { elementsContainer } from "./script.js";





export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const textTitle = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__like");
  const buttonDeleteCard = cardElement.querySelector(".element__delete-button");

  textTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__liked");
  });

  buttonDeleteCard.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    const imageUrl = cardImage.getAttribute("src");
    const imageAlt = cardImage.getAttribute("alt");
    popupImage.setAttribute("src", imageUrl);
    popupImage.setAttribute("alt", imageAlt);
    popupImageTitle.textContent = imageAlt;
    openPopup(popupSectionImage, popupImageContainer);
  });
  popupCloseImage.addEventListener("click", () => {
    closePopup(popupSectionImage, popupImageContainer);
  });

  return cardElement;
}




export function addCardToPage(name, link) {
  const createdCard = createCard(name, link);
  elementsContainer.prepend(createdCard);
}
