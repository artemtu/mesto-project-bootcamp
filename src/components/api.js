import {
  profileAvatar,
  profileBio,
  profileName,
  publishedCards,
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
    })
    .catch((error) => {
      console.error(error);
    });
}

export function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    }),
  })
  .then((res) => res.json())
  .catch((error) => {
    console.error("Error:", error);
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
      return data._id;
    });
}

Promise.all([getInfoProfile(), , getCards(), getMyId()])
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

export function updateAvatar(avatarLinkInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value
    }),
  })

  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Failed to update avatar");
  })
  .then((data) => {
    profileAvatar.src = data.avatar;
  })
  .catch((error) => {
    console.error(error);
  });
}