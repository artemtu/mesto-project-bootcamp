import {
  profileAvatar,
  profileBio,
  profileName,
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

// fetch(`${config.baseUrl}/cards`, {
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
