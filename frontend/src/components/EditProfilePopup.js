import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContexts";
import InputValidation from "./InputValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  
  const[name, setName] = React.useState('');
  const[description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(value) {
    setName(value);
  } 

  function handleDescriptionChange(value) {
    setDescription(value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading}>
      <InputValidation
        onChange={handleNameChange}
        type="text" value={name || ''}
        name="username"
        id="username"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required />
      <InputValidation onChange={handleDescriptionChange} type="text" value={description || ''} name="caption" id="caption" placeholder="Расскажите о себе" minLength="2" maxLength="200" required />
    </PopupWithForm>
  )
}

export default EditProfilePopup;