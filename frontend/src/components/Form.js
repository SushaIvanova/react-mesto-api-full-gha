import React from "react";

function Form ({name, title, children, buttonText, onSubmit, isLoading}) {
  return (
    <div className="auth">
    <form className='form form_purpose_auth' name={name} title='Вход' buttonText='Войти' onSubmit={onSubmit}>
      <h2 className='form__title form__title_purpose_auth'>{title}</h2>
      {children}
      <button className='form__save-button form__save-button_purpose_auth' type="submit" name="save-button">{isLoading? 'Сохранение...' : buttonText}</button>
    </form>
  </div>
  )
}

export default Form;