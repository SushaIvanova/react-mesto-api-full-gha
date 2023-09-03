import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_purpose_image${card ? ' popup_opened' : ''}`}>
      <div className="popup__container popup__container_purpose_image">
        <button type="button" className="popup__close-button popup__close-button_purpose_image" onClick={onClose} aria-label="Закрыть"></button>
        <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
        <p className="popup__image-title">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;