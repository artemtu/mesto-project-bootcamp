const popupSection = document.querySelector(".popup");
const popupContainer = popupSection.querySelector(".popup__container");
const closePopupButton = document.querySelector(".popup__close-icon");

const profileButton = document.querySelector(".profile__edit");
const formElement = document.querySelector(".popup__profile-form");

const authorNameInput = document.getElementById("popup__inputs_name");
const bioInput = document.getElementById("popup__inputs_bio");
const authorName = document.querySelector(".profile__author");
const bio = document.querySelector(".profile__bio");

function activeAndClosePopup() {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;

  profileButton.addEventListener("click", () => {
    popupSection.classList.add("popup__container_active");
    popupContainer.classList.add("popup__container_active");
  });

  closePopupButton.addEventListener("click", () => {
    popupSection.classList.remove("popup__container_active");
    popupContainer.classList.remove("popup__container_active");

    bioInput.value = bio.textContent;
    authorNameInput.value = authorName.textContent;
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  authorName.textContent = authorNameInput.value;
  bio.textContent = bioInput.value;

  popupSection.classList.remove("popup__container_active");
  popupContainer.classList.remove("popup__container_active");
}

activeAndClosePopup();
formElement.addEventListener("submit", handleFormSubmit);

const elementSection = document.querySelector(".element");
const elementImage = elementSection.querySelector(".element__image");
const elementTitle = elementSection.querySelector(".element__title");

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

const elementSections = document.querySelectorAll(".element");

initialCards.forEach((card, index) => {
  const elementSection = elementSections[index];
  const elementImage = elementSection.querySelector(".element__image");
  const elementTitle = elementSection.querySelector(".element__title");
  elementTitle.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
});




