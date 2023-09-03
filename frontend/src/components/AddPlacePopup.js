import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }
  
  React.useEffect(() => {
    if (isOpen) {
      cardNameRef.current.value = '';
      cardLinkRef.current.value = '';
    }
  }, [isOpen])
  

  return (
    <PopupWithForm name='card' title='Новое место' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading}>
      <input className="form__element form__element_type_place" ref={cardNameRef} type="text" name="name" id="place" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="form-error place-form-error" id="place-form-error"></span>
      <input className="form__element form__element_type_link" ref={cardLinkRef} type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
      <span className="form-error link-form-error" id="link-form-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;