import React from 'react';

function Card({ card, onCardClick }) {
    function handleImageClick() {
        onCardClick(card);
    }

    return (
        <ul className="gallery__list">
            <li className="gallery__items card">
                <img className="card__image" onClick={handleImageClick} src={card.link} alt={card.name} />
                <button className="card__trash" type="button" aria-label="Удалить"></button>
                <div className="card__description">
                    <h2 className="card__name">{card.name}</h2>
                    <div className="card__like-container">
                        <button className="card__like like" type="button" aria-label="Нравится"></button>
                        <p className="like__counter">{card.likes.length}</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Card;
