import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup() {
    return (
        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да">
            <h3 className="popup__avatar-title">Вы уверены?</h3>
        </PopupWithForm>
    );
}

export default ConfirmPopup;
