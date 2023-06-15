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

import {
  getCards,
  patchProfile,
  postCard,
  updateAvatar,
} from "../components/api.js";

// попап профиль
const popupProfile = document.querySelector(".popup-profile");
const popupEditProfileButton = document.querySelector(".profile__edit");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileBio = document.querySelector(".profile__bio");
export const profileName = document.querySelector(".profile__author");
const popupProfileForm = popupProfile.querySelector(".popup__profile-form");
const authorNameInput = document.getElementById("popup__inputs_name");
const bioInput = document.getElementById("popup__inputs_bio");
const authorName = document.querySelector(".profile__author");
const bio = document.querySelector(".profile__bio");
// const profileSaveButton = document.querySelector(".popup__button");
const profileSaveButton2 = document.getElementById("profile-submit");

// попап аватар
const popupEditProfileAvatar = document.querySelector(
  ".profile__avatar-button"
);
const popupSectionAvatar = document.querySelector(".popup-profile-avatar");
const avatarLinkInput = document.getElementById("popup__inputs_profile-avatar");
const popupProfileAvatarForm = document.querySelector(".popup__avatar-form");
const avatarSaveButton = document.getElementById("avatar-submit");

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

// Профиль АВАТАР =============================
popupEditProfileAvatar.addEventListener("click", () => {
  openPopup(popupSectionAvatar);
  disableButton(avatarSaveButton);
});

function handleFormSubmitProfileAvatar(evt) {
  evt.preventDefault();
  showLoadingStatus(avatarSaveButton);
  updateAvatar(avatarLinkInput)
    .then(() => {
      resetForm(popupProfileAvatarForm);
      resetButtonText(avatarSaveButton);
      closePopup(popupSectionAvatar);
    })
    .catch((error) => {
      // Обработка ошибок при обновлении аватара
      console.error(error);
    });
}

popupProfileAvatarForm.addEventListener(
  "submit",
  handleFormSubmitProfileAvatar
);

// // https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80
// https://images.unsplash.com/photo-1685052392951-4eb54985d3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80

//== операции с профилем (РЕДАКТИРОВАНИЕ) //
popupEditProfileButton.addEventListener("click", () => {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;
  openPopup(popupProfile);
});
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  authorName.textContent = authorNameInput.value;
  bio.textContent = bioInput.value;
  showLoadingStatus(profileSaveButton2);
  patchProfile().then(() => {
    resetForm(popupProfileForm);
    resetButtonText(profileSaveButton2);
    closePopup(popupProfile);
  });
}

popupProfileForm.addEventListener("submit", handleFormSubmitProfile);

// console.log(profileSaveButton );
// операции с попапом карточек =============================

popupCardButton.addEventListener("click", () => {
  openPopup(popupCardAdd, popupCardContainer);
  disableButton(cardSaveButton);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;
  addCardToPage(name, link);
  showLoadingStatus(cardSaveButton);
  postCard().then(() => {
    resetForm(popupCardForm);
    resetButtonText(cardSaveButton);
    closePopup(popupCardAdd);
  });
}

popupCardForm.addEventListener("submit", handleFormSubmitCard);

// ==================================================//

// добавление карточек //
import { getMyId } from "../components/api.js";
export function publishedCards() {
  getMyId()
    .then((myId) => {
      getCards().then((data) => {
        data.forEach((card) => {
          const name = card.name;
          const link = card.link;
          const like = card.likes.length;
          const ownerId = card.owner._id;
          const cardId = card._id;
          const likesArray = card.likes;
          const createdCard = createCard(
            name,
            link,
            like,
            myId,
            ownerId,
            cardId,
            likesArray
          );
          elementsContainer.append(createdCard);
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// publishedCards()

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

// изменение текста на кнопках при отправке формы

let originalButtonText;

function showLoadingStatus(button) {
  originalButtonText = button.textContent;
  button.textContent = "Сохранение...";
}

function resetForm(form) {
  form.reset();
}

function resetButtonText(button) {
  button.textContent = originalButtonText;
}
