// import '../../src/pages/index.css'
import {
  enableButton,
  disableButton,
  enableValidation,
} from "../components/validation.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
  closePopupEsc,
} from "../components/modal.js";
import {
  popupCardButton,
  popupCloseCard,
  popupCardForm,
  popupCardAdd,
  popupCardContainer,
  placeNameInput,
  clickOnCard,
  linkInput,
  createCard,
  addCardToPage,
} from "../components/card.js";

// попап профиль
const popupProfile = document.querySelector(".popup-profile");
const popupProfileContainer = popupProfile.querySelector(
  ".popup__container_profile"
);
const popupEditProfileButton = document.querySelector(".profile__edit");
const popupCloseProfile = popupProfileContainer.querySelector(
  ".popup-close-profile"
);
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
const cardImage = cardTemplate.querySelector(".element__image");
const cardTitle = cardTemplate.querySelector(".element__title");
const cardSaveButton = document.querySelector("#card-submit");

//==============================================================================//

//== операции с профилем//
popupEditProfileButton.addEventListener("click", () => {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;
  openPopup(popupProfile);
  enableButton(profileSaveButton);
});

popupCloseProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  authorName.textContent = authorNameInput.value;
  bio.textContent = bioInput.value;
  closePopup(popupProfile);
}

popupProfileForm.addEventListener("submit", handleFormSubmitProfile);

//=====================================================//
// операции с попапом карточек

popupCardButton.addEventListener("click", () => {
  openPopup(popupCardAdd, popupCardContainer);
  disableButton(cardSaveButton);
});

popupCloseCard.addEventListener("click", () => {
  closePopup(popupCardAdd);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  addCardToPage(name, link);
  closePopup(popupCardAdd);
  placeNameInput.value = "";
  linkInput.value = "";
}

popupCardForm.addEventListener("submit", handleFormSubmitCard);

// открытие карточек (попап)

popupCloseImage.addEventListener("click", () => {
  closePopup(popupSectionImage);
});

const allCards = document.querySelectorAll(".element__image");

clickOnCard(allCards);
// ==================================================//

// добавление карточек //

const initialCards = [
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

initialCards.forEach((card) => {
  const name = card.name;
  const link = card.link;
  const createdCard = createCard(name, link);
  elementsContainer.append(createdCard);
});

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

closePopupOverlay(popupProfile);
closePopupOverlay(popupCardAdd);
closePopupOverlay(popupSectionImage);

closePopupEsc(popupProfile);
closePopupEsc(popupCardAdd);
closePopupEsc(popupSectionImage);
