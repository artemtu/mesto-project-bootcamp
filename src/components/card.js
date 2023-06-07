import {
  elementsContainer,
  cardTemplate,
  popupCloseImage,
  popupSectionImage,
  popupImageContainer,
  popupImage,
  popupImageTitle,
} from "../components/script.js";
import { openPopup} from "../components/modal.js";

export const popupCardAdd = document.querySelector(".popup_add");
export const popupCardContainer = document.querySelector(
  ".popup__container_add"
);
export const popupCardButton = document.querySelector(".profile__add-button");
export const popupCloseCard = document.querySelector(".popup-close-card");
export const popupCardForm = document.querySelector(".popup__card-form");
export const placeNameInput = document.getElementById(
  "popup__inputs_place_name"
);
export const linkInput = document.getElementById("popup__inputs_place_link");

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
    openPopup(popupSectionImage);
  });
  return cardElement;
}

export function addCardToPage(name, link) {
  const createdCard = createCard(name, link);
  elementsContainer.prepend(createdCard);
}

export function clickOnCard(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const imageUrl = card.getAttribute("src");
      const imageAlt = card.getAttribute("alt");
      popupImage.setAttribute("src", imageUrl);
      popupImage.setAttribute("alt", imageAlt);
      popupImageTitle.textContent = card.alt;
      popupSectionImage.classList.add("popup__container_active");
    });
  });
}
