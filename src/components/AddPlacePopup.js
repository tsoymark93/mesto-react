import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            formName="popupAddForm"
            onSubmit={handleSubmit}
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
                value={name}
                onChange={handleChangeName}
            />
            <span className="popup__input-error gallery-name-error"></span>
            <input
                type="url"
                id="gallery-link"
                placeholder="Ссылка на картинку"
                name="link"
                className="popup__input popup__input_link"
                required
                value={link}
                onChange={handleChangeLink}
            />
            <span className="popup__input-error gallery-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
