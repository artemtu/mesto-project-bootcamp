// попапы

// попап Профиль
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

// попап добавление карточки
// скопировал

// попап открытия изображения
const popupSectionImage = document.querySelector(".popup-image");
const popupImageContainer = document.querySelector(".popup__container_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__title");
export const popupCloseImage = document.querySelector(".popup-close-image");

//==============================================================================//

// элементы для создания карточек

const template = document.getElementById("cards");
export const elementsContainer = document.querySelector(".elements");
export const cardTemplate = template.content.querySelector(".element");
const cardImage = cardTemplate.querySelector(".element__image");
const cardTitle = cardTemplate.querySelector(".element__title");



//==============================================================================//
import {enableButton} from './validation.js';

import {openPopup} from './modal.js';
import {closePopup} from './modal.js';
import {popupCardButton} from '../components/card.js';
import { popupCloseCard } from '../components/card.js';
import { popupCardForm } from '../components/card.js';

import { popupCardAdd } from '../components/card.js';
import { popupCardContainer } from '../components/card.js';

//



//== PROFILE//
popupEditProfileButton.addEventListener("click", () => {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;
  openPopup(popupProfile, popupProfileContainer);
  enableButton(profileSaveButton);
});

popupCloseProfile.addEventListener("click", () => {
  closePopup(popupProfile, popupProfileContainer);
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  authorName.textContent = authorNameInput.value;
  bio.textContent = bioInput.value;
  closePopup(popupProfile, popupProfileContainer);
}

popupProfileForm.addEventListener("submit", handleFormSubmitProfile);

//=====================================================//

popupCardButton.addEventListener("click", () => {
  openPopup(popupCardAdd, popupCardContainer);
});

popupCloseCard.addEventListener("click", () => {
  closePopup(popupCardAdd, popupCardContainer);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  addCardToPage(name, link);
  closePopup(popupCardAdd, popupCardContainer);
}

popupCardForm.addEventListener("submit", handleFormSubmitCard);

// добавление карточки //
import { placeNameInput } from '../components/card.js';
import { linkInput } from '../components/card.js';
import {createCard} from '../components/card.js';
import {addCardToPage} from '../components/card.js';


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

import {enableValidation} from './validation.js';


const validitySettings = {
  formSelector: ".popup__profile-form",
  inputSelector: ".popup__inputs-text",
  buttonSelector: ".popup__button",
};


enableValidation(validitySettings)

//==============================================//

// закрытие попапа - клик overlay и esc//

import {closePopupOverlay} from './modal.js';
import {closePopupEsc} from './modal.js';

export const popupLists = document.querySelectorAll(".popup");



closePopupOverlay(popupProfile, popupProfileContainer);
closePopupOverlay(popupCardAdd, popupCardContainer);
closePopupOverlay(popupSectionImage, popupImageContainer);


closePopupEsc(popupProfile, popupProfileContainer);
closePopupEsc(popupCardAdd, popupCardContainer);
closePopupEsc(popupSectionImage, popupImageContainer);

