import {
  elementsContainer,
  cardTemplate,
  popupSectionImage,
  popupImage,
  popupImageTitle,
} from "../components/script.js";
import { openPopup } from "../components/modal.js";
import { dropCardFromServer, putLike, deleteLike } from "./api.js";
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

export function createCard(
  name,
  link,
  like,
  myId,
  ownerId,
  cardId,
  likesArray
  
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const textTitle = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__like");
  const buttonDeleteCard = cardElement.querySelector(".element__delete-button");
  let likesCount = cardElement.querySelector(".element__like-counter");

  textTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likesCount.textContent = like;

  likeButton.addEventListener("click", () => {

    if (likeButton.classList.contains("element__liked")) {
      deleteLike(cardId).then((updatedLikesCount) => {
        likesCount.textContent = updatedLikesCount;
      });
    } else {
      putLike(cardId).then((updatedLikesCount) => {
        likesCount.textContent = updatedLikesCount;
      });
    }
    if (likeButton.classList.contains("element__like")) {
      likeButton.classList.remove("element__like");
      likeButton.classList.add("element__liked");
      
    } else {
      likeButton.classList.remove("element__liked");
      likeButton.classList.add("element__like");
  
    }
  });


  if (ownerId !== myId) {
    buttonDeleteCard.style.display = "none";
  } else {
    buttonDeleteCard.style.display = "flex";
  }

  buttonDeleteCard.addEventListener("click", () => {
    cardElement.remove(), dropCardFromServer(cardId);
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






// likesArray.forEach((element) => {
//   const everyCard = element._id;
//   if (myId === everyCard) {
//     likeButton.classList.remove("element__like");
//     likeButton.classList.add("element__liked");
//   }  else {
//     likeButton.classList.remove("element__liked");
//     likeButton.classList.add("element__like");
//   }
// });
