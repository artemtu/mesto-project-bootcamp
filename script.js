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

// попап добавление карточки
const popupCardAdd = document.querySelector(".popup_add");
const popupCardContainer = document.querySelector(".popup__container_add");
const popupCardButton = document.querySelector(".profile__add-button");
const popupCloseCard = document.querySelector(".popup-close-card");
const popupCardForm = document.querySelector(".popup__card-form");
const placeNameInput = document.getElementById("popup__inputs_place_name");
const linkInput = document.getElementById("popup__inputs_place_link");

// попап открытия изображения
const popupSectionImage = document.querySelector(".popup-image");
const popupImageContainer = document.querySelector(".popup__container_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__title");
const popupCloseImage = document.querySelector(".popup-close-image");

//==============================================================================//

// элементы для создания карточек

const template = document.getElementById("cards");
const cardTemplate = template.content.querySelector(".element");
const cardImage = cardTemplate.querySelector(".element__image");
const cardTitle = cardTemplate.querySelector(".element__title");
const elementsContainer = document.querySelector(".elements");

//==============================================================================//

//

function openPopup(popup, popupContainer) {
  popup.classList.add("popup__container_active");
  popupContainer.classList.add("popup__container_active");
}

function closePopup(popup, popupContainer) {
  popup.classList.remove("popup__container_active");
  popupContainer.classList.remove("popup__container_active");
}

//== PROFILE//
popupEditProfileButton.addEventListener("click", () => {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;
  openPopup(popupProfile, popupProfileContainer);
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

function createCard(name, link) {
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

initialCards.forEach((card) => {
  const name = card.name;
  const link = card.link;
  const createdCard = createCard(name, link);
  elementsContainer.append(createdCard);
});

function addCardToPage(name, link) {
  const createdCard = createCard(name, link);
  elementsContainer.prepend(createdCard);
}

// ==================================================//

// валидация//

function showError(input) {
  const spanId = `error-${input.id}`;
  const errorField = document.getElementById(spanId);
  errorField.textContent = input.validationMessage;
}

function hideError(input) {
  const spanId = `error-${input.id}`;
  const errorField = document.getElementById(spanId);
  errorField.textContent = "";
}

function checkValid(input) {
  if (input.validity.valid) {
    hideError(input);
  } else {
    showError(input);
  }
}

const profileForm = document.forms.profile__edit;
const cardForm = document.forms.card__edit;

function checkFormValidity(someForm, submitButton) {
  if (someForm.checkValidity()) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

function enableButton(submitButton) {
  submitButton.disabled = false;
}

function disableButton(submitButton) {
  submitButton.disabled = true;
}

const inputList = document.querySelectorAll(".popup__inputs-text");
const profileSubmitButton = document.getElementById("profile-submit");
const cardSubmitButton = document.getElementById("card-submit");

inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkValid(input);
    checkFormValidity(profileForm, profileSubmitButton);
    checkFormValidity(cardForm, cardSubmitButton);
  });
});

checkFormValidity(cardForm, cardSubmitButton);

//==============================================//

// закрытие попапа - клик overlay и esc//

const popupLists = document.querySelectorAll(".popup");

function closePopupOverlay(popupSection, popupContainer) {
  popupLists.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closePopup(popupSection, popupContainer);
      }
    });
  });
}

closePopupOverlay(popupProfile, popupProfileContainer);
closePopupOverlay(popupCardAdd, popupCardContainer);
closePopupOverlay(popupSectionImage, popupImageContainer);

function closePopupEsc(popupSection, popupContainer) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popupSection, popupContainer);
    }
  });
}
closePopupEsc(popupProfile, popupProfileContainer);
closePopupEsc(popupCardAdd, popupCardContainer);
closePopupEsc(popupSectionImage, popupImageContainer);
