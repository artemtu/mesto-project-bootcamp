const popupSection = document.querySelector(".popup");
const popupContainer = popupSection.querySelector(".popup__container");
const closePopupButton = document.querySelector(".popup__close-icon");

const profileButton = document.querySelector(".profile__edit");
const formElement = document.querySelector(".popup__profile-form");

const authorNameInput = document.getElementById("popup__inputs_name");
const bioInput = document.getElementById("popup__inputs_bio");
const authorName = document.querySelector(".profile__author");
const bio = document.querySelector(".profile__bio");

// контстанты для попапа добавления карточки
const popupSectionCard = document.querySelector(".popup_add");
const popupContainerCard = popupSectionCard.querySelector(".popup__container_add");
const closePopupButtonCard = document.querySelector(".popup-close-card");
const CardButton = document.querySelector(".profile__add-button");
const formElementCard = document.querySelector(".popup__card-form");
const placeNameInput = document.getElementById("popup__inputs_place_name");
const linkInput = document.getElementById("popup__inputs_place_link");

const template = document.getElementById('cards');
const cardTemplate = template.content.querySelector('.element');
const cardImage = cardTemplate.querySelector('.element__image');
const cardTitle = cardTemplate.querySelector('.element__title');






// функция открытия и закрытия попапов
function activeAndClosePopup() {
  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;

  profileButton.addEventListener("click", () => {
    popupSection.classList.add("popup__container_active");
    popupContainer.classList.add("popup__container_active");
  });

  CardButton.addEventListener("click", () => {
    popupSectionCard.classList.add("popup__container_active");
    popupContainerCard.classList.add("popup__container_active");
  });

  closePopupButton.addEventListener("click", () => {
    popupSection.classList.remove("popup__container_active");
    popupContainer.classList.remove("popup__container_active");
  });

  closePopupButtonCard.addEventListener("click", () => {
    popupSectionCard.classList.remove("popup__container_active");
    popupContainerCard.classList.remove("popup__container_active");
  });

  bioInput.value = bio.textContent;
  authorNameInput.value = authorName.textContent;
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  authorName.textContent = authorNameInput.value;
  bio.textContent = bioInput.value;
  const name = placeNameInput.value; 
  const link = linkInput.value; 

  addCardToPage(name, link); 


  formElementCard.reset();
  popupSectionCard.classList.remove("popup__container_active");
  popupContainerCard.classList.remove("popup__container_active");

  popupSection.classList.remove("popup__container_active");
  popupContainer.classList.remove("popup__container_active");
}

activeAndClosePopup();
formElement.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", handleFormSubmit);

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


function addCardToPage(name, link) {
  const createdCard = createCard(name, link); 
  const elementsContainer = document.querySelector('.elements');
  elementsContainer.appendChild(createdCard); 
  const firstCard = elementsContainer.firstChild;

  elementsContainer.insertBefore(createdCard, firstCard);
  
  const likeButton = createdCard.querySelector(".element__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__liked");
})};


// лайк карточек
function likeCard() {
  const likeButtons = document.querySelectorAll(".element__like");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("element__liked");
    });
  });
}

likeCard();



// удаление карточек
const cards = document.querySelectorAll('.element');



function deleteCard(){
  cards.forEach((card) => {
    const buttonDeleteCard = card.querySelector('.element__delete-button');
    buttonDeleteCard.addEventListener("click", () => {
      card.remove();
    });
  });
};

deleteCard()






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


