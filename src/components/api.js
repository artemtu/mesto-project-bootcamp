import {
  profileAvatar,
  profileBio,
  profileName,
} from "../components/script.js";

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
