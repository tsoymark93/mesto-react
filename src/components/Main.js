import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { useEffect, useState } from 'react';

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUser(), api.getInitialCards()])
            .then(([userData, dataCards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(dataCards);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{userName}</h1>
                        <button
                            className="profile__edit-btn"
                            onClick={props.onEditProfile}
                            type="button"
                            aria-label="Изменить"
                        ></button>
                    </div>
                    <p className="profile__profession">{userDescription}</p>
                </div>
                <button
                    className="profile__add-btn"
                    onClick={props.onAddPlace}
                    type="button"
                    aria-label="Добавить"
                ></button>
            </section>

            <section className="gallery">
                {cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} />
                ))}
            </section>
        </main>
    );
}

export default Main;
