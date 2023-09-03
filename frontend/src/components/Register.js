import React from "react";
import Form from "./Form";
import {Link} from 'react-router-dom';

function Register({onRegister, onChange, formValue}) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue);
  }

  return (
    <>
      <Form name='register' title='Регистрация' buttonText='Зарегистрироваться' onSubmit={handleSubmit}>
        <input className='form__element form__element_purpose_auth form__element_type_email' type="email" value={formValue.email} onChange={onChange} name="email" id="email" placeholder="Email" required />
        <span className="form-error email-form-error" id="place-form-error"></span>
        <input className='form__element form__element_purpose_auth form__element_type_password' type="password" value={formValue.password} onChange={onChange} name="password" id="password" placeholder="Пароль" required />
        <span className="form-error password-form-error" id="link-form-error"></span>
      </Form>
      <div className="sign-in">
        <p className="sign-in__question">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="sign-in__link">Войти</Link>
      </div>
    </>
   
  )
}

export default Register;