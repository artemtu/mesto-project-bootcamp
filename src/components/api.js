//'https://mesto.nomoreparties.co/v1/wbf-cohort-9/users/me', {
// authorization: '5bef7bd0-1f3c-46db-9b6c-5d6391206dbb'

// запрос на получение данных о пользователе -- успех
fetch("https://mesto.nomoreparties.co/v1/wbf-cohort-9/users/me", {
  headers: {
    authorization: "5bef7bd0-1f3c-46db-9b6c-5d6391206dbb",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

