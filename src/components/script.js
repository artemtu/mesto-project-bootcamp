// import '../../src/pages/index.css'
import { disableButton, enableValidation } from "../components/validation.js";
import { openPopup, closePopup } from "../components/modal.js";
import {
  popupCardButton,
  popupCardForm,
  popupCardAdd,
  popupCardContainer,
  createCard,
} from "../components/card.js";
import { placeNameInput, linkInput } from "../components/card.js";
import {
  getInfoProfile,
  getMyId,
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
const profileSaveButton = document.getElementById("profile-submit");

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

export const popupLists = document.querySelectorAll(".popup");

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
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .then(() => {
      resetForm(popupProfileAvatarForm);
      resetButtonText(avatarSaveButton);
      closePopup(popupSectionAvatar);
    })
    .catch((error) => {
      console.error(error);
    });
}

popupProfileAvatarForm.addEventListener(
  "submit",
  handleFormSubmitProfileAvatar
);

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
  showLoadingStatus(profileSaveButton);
  patchProfile(profileName, profileBio)
    .then(() => {
      resetForm(popupProfileForm);
      resetButtonText(profileSaveButton);
      closePopup(popupProfile);
    })
    .catch((error) => {
      console.error(error);
    });
}

popupProfileForm.addEventListener("submit", handleFormSubmitProfile);

// операции с попапом карточек =============================

popupCardButton.addEventListener("click", () => {
  openPopup(popupCardAdd, popupCardContainer);
  disableButton(cardSaveButton);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  showLoadingStatus(cardSaveButton);
  postCard(placeNameInput.value, linkInput.value)
    .then((res) => {
      elementsContainer.prepend(
        createCard(
          res.name,
          res.link,
          res.likes.length,
          res.owner._id,
          res.owner._id,
          res._id,
          res.likes
        )
      );
      resetForm(popupCardForm);
      resetButtonText(cardSaveButton);
      closePopup(popupCardAdd);
    })
    .catch((error) => {
      console.error(error);
    });
}

popupCardForm.addEventListener("submit", handleFormSubmitCard);

// ==================================================//

// добавление карточек //
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

// валидация//

const validitySettings = {
  formSelector: ".popup__profile-form",
  inputSelector: ".popup__inputs-text",
  buttonSelector: ".popup__button",
  inputErrorClass: "popup__inputs-text_invalid",
};

enableValidation(validitySettings);

//==============================================//

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

//==============================================//
// БЛОК КОДА С СЕРВЕРА

getInfoProfile()
  .then((data) => {
    profileName.textContent = data.name;
    profileBio.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((error) => {
    console.error(error);
  });

Promise.all([getInfoProfile(), , getCards()])
  .then(([cards]) => {
    getInfoProfile();
    getCards();
    publishedCards();
  })
  .catch((error) => {
    console.error(error);
  });

popupLists.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__container_active")) {
      closePopup(popup);
    }
  });
});
