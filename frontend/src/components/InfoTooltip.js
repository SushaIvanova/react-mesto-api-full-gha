import React from "react";
import errorIcon from "../images/error-icon.svg";
import successIcon from "../images/success-icon.svg";

function InfoTooltip({isOpen, onClose, isSuccess}) {
  const successText = 'Вы успешно зарегистрировались!';
  const errorText = 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
  <div className={`popup popup_purpose_tooltip${isOpen ? ' popup_opened' : ''}`}>
    <div className="popup__container">
      <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
     <div className="tooltip">
     <div className="tooltip__image" style={{ backgroundImage: `url(${isSuccess ? successIcon : errorIcon})`}}></div>
      <span className="tooltip__text" id="text">{isSuccess ? successText : errorText}</span> 
     </div>
    </div>
  </div>
     
  )
}

export default InfoTooltip;