import {
  elementsContainer,
  cardTemplate,
  popupSectionImage,
  popupImage,
  popupImageTitle,
} from "./index.js";
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
  like = 0,
  myId,
  ownerId,
  cardId,
  likesArray = []
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const textTitle = cardElement.querySelector(".element__title");
  const likeButton = cardElement.querySelector(".element__like");
  const buttonDeleteCard = cardElement.querySelector(".element__delete-button");
  const likesCount = cardElement.querySelector(".element__like-counter");

  const isLiked = likesArray.find((like) => myId === like._id);

  if (isLiked) {
    likeButton.classList.remove("element__like");
    likeButton.classList.add("element__liked");
  }

  textTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likesCount.textContent = like;
  function toggleLikeButton() {
    if (likeButton.classList.contains("element__like")) {
      likeButton.classList.remove("element__like");
      likeButton.classList.add("element__liked");
    } else {
      likeButton.classList.remove("element__liked");
      likeButton.classList.add("element__like");
    }
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("element__liked")) {
      deleteLike(cardId)
        .then((updatedCardData) => {
          likesCount.textContent = updatedCardData.likes.length;
          toggleLikeButton();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      putLike(cardId)
      .then((updatedCardData) => {
        likesCount.textContent = updatedCardData.likes.length;
          toggleLikeButton();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  if (ownerId !== myId) {
    buttonDeleteCard.style.display = "none";
  } else {
    buttonDeleteCard.style.display = "flex";
  }

  buttonDeleteCard.addEventListener("click", () => {
    dropCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => {
        console.error(error);
      });
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
