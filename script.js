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

// добавление карточек на страницу

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

const template = document.getElementById('cards');
const cardTemplate = template.content.querySelector('.element');

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const textTitle = cardElement.querySelector('.element__title');

  textTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
};

initialCards.forEach((card) => {
  const name = card.name;
  const link = card.link;
  const elementsContainer = document.querySelector('.elements');
  const createdCard = createCard(name, link);
  elementsContainer.appendChild(createdCard);
});

























// function createCard(name, link){
//   const container = document.querySelector('#cards');
//   const element = document.createElement('div')
//   element.classList.add('element');

//   const image = document.createElement('img');
//   image.classList.add('element__image')
//   image.setAttribute('src', link);
//   image.setAttribute('alt', name);
//   element.appendChild(image);

//   const title = document.createElement('h3');
//   title.textContent = name;
//   title.classList.add('element__title');
//   element.appendChild(title);

//   const button = document.createElement('button');
//   button.classList.add('element__like');
//   element.appendChild(button);

//   container.appendChild(element);
// };


