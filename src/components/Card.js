import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = ` ${isOwn ? 'card__trash' : 'card__trash_hidden'}`;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__like like ${isLiked ? 'card__like_active' : ''}`;

    function handleImageClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <ul className="gallery__list">
            <li className="gallery__items card">
                <img className="card__image" onClick={handleImageClick} src={card.link} alt={card.name} />
                <button
                    className={cardDeleteButtonClassName}
                    onClick={handleCardDelete}
                    type="button"
                    aria-label="Удалить"
                ></button>
                <div className="card__description">
                    <h2 className="card__name">{card.name}</h2>
                    <div className="card__like-container">
                        <button
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                            type="button"
                            aria-label="Нравится"
                        ></button>
                        <p className="like__counter">{card.likes.length}</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Card;
