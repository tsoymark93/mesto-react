import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        if (isOpen && currentUser.name && currentUser.about) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            formName="popupEditForm"
            onSubmit={handleSubmit}
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
                onChange={handleChangeName}
                value={name}
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
                onChange={handleChangeDescription}
                value={description}
            />
            <span className="popup__input-error profile-profession-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
