import React from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }
    function handleEditPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setImagePopupOpen(false)
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
            name='avatar'
            title='Обновить аватар'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
        >
            <form name="popupAvatarForm" action="form" className="popup__form popup__avatar-form" method="post" noValidate>
                <input 
                type="url"
                id="avatar"
                placeholder="Ссылка на аватарку"
                name="avatar"
                className="popup__input popup__input_avatar"
                required
                minLength="2"
                />
                <span className="popup__input-error avatar-error"></span>
                <button type="submit" className="popup__save-btn" aria-label="Сохранить" disabled>Сохранить</button>
            </form>
        </PopupWithForm>
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        >
            <form name="popupEditForm" action="form" className="popup__form popup__edit-form" noValidate>
                <input 
                type="text"
                id="profile-name"
                placeholder="Имя"
                name="name"
                className="popup__input popup__input_name" 
                required
                minLength="2"
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
                minLength="2"
                maxLength="200"
                />
                <span className="popup__input-error profile-profession-error"></span>
                <button type="submit" className="popup__save-btn" aria-label="Сохранить" disabled>Сохранить</button>
            </form>
        </PopupWithForm>
        <PopupWithForm
            name='add'
            title='Новое место'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
        >
            <form name="popupAddForm" action="form" className="popup__form popup__add-form" noValidate>
                <input 
                type="text"
                id="gallery-name"
                placeholder="Название"
                name="description"
                className="popup__input popup__input_gallery"
                required
                minLength="2"
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
                <button type="submit" className="popup__save-btn" aria-label="Создать" disabled>Создать</button>
            </form>
        </PopupWithForm>
        <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            >
            <form className="popup__form popup__confirm-form">
                <h3 className="popup__avatar-title">Вы уверены?</h3>
                <button type="submit" className="popup__confirm-btn">Да</button>
            </form>
        </PopupWithForm>
        <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
        />

    <template className="gallery-template">

    </template>
</div>
  );
}

export default App;
