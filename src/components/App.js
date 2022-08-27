import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpened] = useState(false);
    const [cardToDelete, setCardTodelete] = useState({});

    const isOpen =
        isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isImagePopupOpen ||
        isRemoveCardPopupOpen;

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        api.getInitialCards()
            .then((dataCards) => {
                setCards(dataCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        api.getUser()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleEditPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsRemoveCardPopupOpened(false);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleLikeClick(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        setIsRemoveCardPopupOpened(true);
        setCardTodelete(card);
    }

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api.setUser(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatarData) {
        setIsLoading(true);
        api.updateAvatar(avatarData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(cardData) {
        setIsLoading(true);
        api.createCard(cardData)
            .then((newCard) => {
                setCards((cards) => [newCard, ...cards]);
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleConfirmRemove() {
        setIsLoading(true);
        api.removeCard(cardToDelete._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== cardToDelete._id));
                closeAllPopups();
            })
            .finally(() => setIsLoading(false))
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleEditPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleLikeClick}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <Footer />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />
                <ConfirmPopup
                    isOpen={isRemoveCardPopupOpen}
                    onClose={closeAllPopups}
                    onConfirmRemove={handleConfirmRemove}
                    isLoading={isLoading}
                />
                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
