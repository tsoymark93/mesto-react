import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleEditPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
    }

    const handleCardClick = (card) => {
        setImagePopupOpen(true);
        setSelectedCard(card);
    };

    return (
        <div className="page">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleEditPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                buttonText="Сохранить"
                formName="popupAvatarForm"
            >
                <input
                    type="url"
                    id="avatar"
                    placeholder="Ссылка на аватарку"
                    name="avatar"
                    className="popup__input popup__input_avatar"
                    required
                    // @ts-ignore
                    minLength="2"
                />
                <span className="popup__input-error avatar-error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="edit"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                buttonText="Сохранить"
                formName="popupEditForm"
            >
                <input
                    type="text"
                    id="profile-name"
                    placeholder="Имя"
                    name="name"
                    className="popup__input popup__input_name"
                    required
                    // @ts-ignore
                    minLength="2"
                    // @ts-ignore
                    maxLength="40"
                />
                <span className="popup__input-error profile-name-error"></span>
                <input
                    type="text"
                    id="profile-profession"
                    placeholder="Профессия"
                    name="profession"
                    className="popup__input popup__input_profession"
                    required
                    // @ts-ignore
                    minLength="2"
                    // @ts-ignore
                    maxLength="200"
                />
                <span className="popup__input-error profile-profession-error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="add"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                buttonText="Сохранить"
                formName="popupAddForm"
            >
                <input
                    type="text"
                    id="gallery-name"
                    placeholder="Название"
                    name="description"
                    className="popup__input popup__input_gallery"
                    required
                    // @ts-ignore
                    minLength="2"
                    // @ts-ignore
                    maxLength="30"
                />
                <span className="popup__input-error gallery-name-error"></span>
                <input
                    type="url"
                    id="gallery-link"
                    placeholder="Ссылка на картинку"
                    name="link"
                    className="popup__input popup__input_link"
                    required
                />
                <span className="popup__input-error gallery-link-error"></span>
            </PopupWithForm>
            <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да">
                <h3 className="popup__avatar-title">Вы уверены?</h3>
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        </div>
    );
}

export default App;
