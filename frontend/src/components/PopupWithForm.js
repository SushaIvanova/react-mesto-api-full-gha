import React from "react";

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit, isLoading }) {

  
  return (
    <div className={`popup popup_purpose_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Сохранить изменения" onClick={onClose}></button>
        <form name={name} className={`form form_purpose_${name}`} onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__save-button" type="submit" name="save-button">{isLoading? 'Сохранение...' : buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;