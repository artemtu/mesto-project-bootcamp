let profileSection = document.querySelector('.profile');
let profileButton = profileSection.querySelector('.profile__edit')
let popupSection = document.querySelector('.popup')
let popupContainer = popupSection.querySelector('.popup__container')
let closePopup = document.querySelector('.popup__close-icon');


function activeAndClosePopup() {
    profileButton.addEventListener('click', () => {
        popupSection.classList.add('popup__container_active');
        popupContainer.classList.add('popup__container_active');

        // Добавляем обработчик события для кнопки закрытия
        closePopup.addEventListener('click', () => {
            popupSection.classList.remove('popup__container_active');
            popupContainer.classList.remove('popup__container_active');
        });
    });
}

activeAndClosePopup();
