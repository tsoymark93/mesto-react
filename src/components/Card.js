function Card(props) {

    function handleImageClick() {
        props.onCardClick(props.card)
    } 

    return(
            <ul className="gallery__list">
                <li className="gallery__items card">
                    <img className="card__image" onClick={handleImageClick} src={props.card.link} alt={props.card.name}/>
                    <button className="card__trash" type="button" aria-label="Удалить"></button>
                    <div className="card__description">
                        <h2 className="card__name">{props.card.name}</h2>
                        <div className="card__like-container">
                            <button className="card__like like" type="button" aria-label="Нравится"></button>
                            <p className="like__counter">{props.card.likes.length}</p>
                        </div>
                    </div>
                </li>
            </ul>
    )
}

export default Card