import { checkResponse } from "./utils.js";

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
  }).then(checkResponse);
}

export function patchProfile(name, bio) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name.textContent,
      about: bio.textContent,
    }),
  });
}

// данные карточек
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
}

export function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
}

export function getMyId() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .then((data) => {
      return data._id;
    });
}

export function dropCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .then((updatedCardData) => {
      const updatedLikesCount = updatedCardData.likes.length;
      return updatedLikesCount;
    });
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .then((updatedCardData) => {
      const updatedLikesCount = updatedCardData.likes.length;
      return updatedLikesCount;
    });
}

export function updateAvatar(avatarLinkInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value,
    }),
  }).then(checkResponse);
}
