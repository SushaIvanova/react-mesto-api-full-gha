import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({ isOpen, onClose, isLoading, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return (
    <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
  )
}

export default DeletePopup;