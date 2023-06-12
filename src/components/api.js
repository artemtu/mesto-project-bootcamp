import {
  profileAvatar,
  profileBio,
  profileName,
  publishedCards,
} from "../components/script.js";

import { placeNameInput, linkInput } from "../components/card.js";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-9",
  headers: {
    authorization: "5bef7bd0-1f3c-46db-9b6c-5d6391206dbb",
    "Content-Type": "application/json",
  },
};

// данные profile

export function getInfoProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileBio.textContent = data.about;
      profileAvatar.src = data.avatar;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function patchProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.textContent,
      about: profileBio.textContent,
    }),
  });
}

// fetch(`${config.baseUrl}/users/me`, {
//   headers: config.headers,
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//   })
//   .then((data) => {
//     console.log(data);
//   });

// данные карточек
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      return data;
      // console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function postCard() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeNameInput.value,
      link: linkInput.value,
    }),
  });
}

export function getMyId() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      // console.log(data)
      return data._id;
    });
}

Promise.all([getInfoProfile(), getCards(), getMyId()])
  .then(([cards]) => {
    getInfoProfile();
    getCards();
    publishedCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

export function dropCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Успешно удалено");
      } else {
        console.log("Возникла ошибка");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((updatedCardData) => {
      const updatedLikesCount = updatedCardData.likes.length;
      return updatedLikesCount;
    })

    .catch((error) => {
      console.error(error);
    });
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((updatedCardData) => {
      const updatedLikesCount = updatedCardData.likes.length;
      return updatedLikesCount;
    })
    .catch((error) => {
      console.error(error);
    });
}

// fetch(`${config.baseUrl}/cards`, {
//   headers: config.headers,
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//   })
//   .then((data) => {
//     data.forEach((card) => {
//       console.log(card);
//     });
//   });

export function updatedLikeStatus(likesArray, myId, likeButton) {
  likesArray.forEach((element) => {
    const everyCard = element._id;
    if (myId === everyCard) {
      likeButton.classList.remove("element__like");
      likeButton.classList.add("element__liked");
    } else {
      likeButton.classList.remove("element__liked");
      likeButton.classList.add("element__like");
    }
  });
}
