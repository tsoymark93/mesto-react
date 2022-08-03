function ImagePopup(props) {

    const classOpenPopup = `${ props.isOpen ? 'popup_opened' : ''}`
    return (
        <div className={`popup popup_type_${props.name} ${classOpenPopup}`}>
            <figure className="popup__figure">
                <button className="popup__close-btn" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                <figcaption className="popup__description"></figcaption>
            </figure>
        </div>
    )
}
export default ImagePopup