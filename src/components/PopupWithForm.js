import React from 'react';

function PopupWithForm(props, children) {
    const classOpenPopup = `${props.isOpen && 'popup_opened'}`;

    return (
        <div className={`popup popup_type_${props.name} ${classOpenPopup}`}>
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    onClick={props.onClose}
                    type="button"
                    aria-label="Закрыть"
                ></button>
                <h3 className="popup__title">{props.title}</h3>
                <form name={props.formName} action="form" className="popup__form" method="post" noValidate>
                    <div>{props.children}</div>
                    <button type="submit" className="popup__save-btn" aria-label="Сохранить" disabled>
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
