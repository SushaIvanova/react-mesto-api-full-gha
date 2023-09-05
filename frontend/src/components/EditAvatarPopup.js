import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading}>
      <input className="form__element form__element_type_avatar" ref={avatarRef} type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
      <span className="form-error avatar-form-error" id="avatar-form-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;