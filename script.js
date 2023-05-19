const profileSection = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit')

const closePopup = document.querySelector('.popup__close-icon');
const nameInput = document.getElementById('popup__inputs_name');
const jobInput = document.getElementById('popup__inputs_bio');
const currentName = profileSection.querySelector('.profile__author').textContent;
const currentJob = profileSection.querySelector('.profile__bio').textContent;


function activeAndClosePopup() {
    const popupSection = document.querySelector('.popup')
    const popupContainer = popupSection.querySelector('.popup__container')

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
