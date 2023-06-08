// import '../../src/pages/index.css'
import {
  enableButton,
  disableButton,
  enableValidation,
} from "../components/validation.js";
import {
  openPopup,
  closePopup,
  // closePopupOverlay,
} from "../components/modal.js";
import {
  popupCardButton,
  popupCardForm,
  popupCardAdd,
  popupCardContainer,
  placeNameInput,
  linkInput,
  createCard,
  addCardToPage,
} from "../components/card.js";

import { getInfoProfile, getCards, patchProfile, postCard } from "../components/api.js";

// попап профиль
const popupProfile = document.querySelector(".popup-profile");
const popupEditProfileButton = document.querySelector(".profile__edit");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileBio = document.querySelector(".profile__bio");
export const profileName = document.querySelector(".profile__author");
const popupProfileForm = document.querySelector(".popup__profile-form");
const authorNameInput = document.getElementById("popup__inputs_name");
const bioInput = document.getElementById("popup__inputs_bio");
const authorName = document.querySelector(".profile__author");
const bio = document.querySelector(".profile__bio");
const profileSaveButton = document.querySelector(".popup__button");





// попап открытия изображения
export const popupSectionImage = document.querySelector(".popup-image");
export const popupImageContainer = document.querySelector(
  ".popup__container_image"
);
export const popupImage = popupImageContainer.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__title");
export const popupCloseImage = document.querySelector(".popup-close-image");

// элементы для создания карточек

const template = document.getElementById("cards");
export const elementsContainer = document.querySelector(".elements");
export const cardTemplate = template.content.querySelector(".element");
const cardSaveButton = document.querySelector("#card-submit");

//==============================================================================//

const closeButtons = document.querySelectorAll(".popup__close-icon");

//==============================================================================//

// закрытие всех попапов по кнопке
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//== операции с профилем//
popupEditProfileButton.addEventListener("click", () => {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;
  openPopup(popupProfile);
  enableButton(profileSaveButton);
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  authorName.textContent = authorNameInput.value;
  bio.textContent = bioInput.value;
  closePopup(popupProfile);
  patchProfile();
}

popupProfileForm.addEventListener("submit", handleFormSubmitProfile);

//=====================================================//
// операции с попапом карточек

popupCardButton.addEventListener("click", () => {
  openPopup(popupCardAdd, popupCardContainer);
  disableButton(cardSaveButton);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  addCardToPage(name, link);
  postCard()
  closePopup(popupCardAdd);
  placeNameInput.value = "";
  linkInput.value = "";

}

popupCardForm.addEventListener("submit", handleFormSubmitCard);

// открытие карточек (попап)

// ==================================================//

// добавление карточек //

function publishedCards() {
  getCards().then((data) => {
    data.forEach((card) => {
      const name = card.name;
      const link = card.link;
      const like = card.likes.length
      const createdCard = createCard(name, link, like);
      elementsContainer.append(createdCard);
    });
  });
}
publishedCards();

// ==================================================//

// валидация//

const validitySettings = {
  formSelector: ".popup__profile-form",
  inputSelector: ".popup__inputs-text",
  buttonSelector: ".popup__button",
  inputErrorClass: "popup__inputs-text_invalid",
};

enableValidation(validitySettings);

//==============================================//

// закрытие попапа - клик overlay и esc//

export const popupLists = document.querySelectorAll(".popup");

// БЛОК РАБОТ С СЕРВЕРОМ

// получение данных профиля с сервера
getInfoProfile();




