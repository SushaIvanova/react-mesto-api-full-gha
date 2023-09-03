import React from "react";
import logo from '../images/logo.svg';
import { Link, useLocation} from 'react-router-dom';

function Header({email, onSignOut}) {
  const location = useLocation();
  return (
    <div className="header section section_width_full">
      <img className="header__logo" src={logo} alt="Логотип с надписью Mesto Russia" />
      <nav className="header__navigation">
        {location.pathname === '/sign-up' ? <Link to="/sign-in" className="header__link">Вход</Link> : 
        location.pathname === '/sign-in' ? <Link to="/sign-up" className="header__link">Регистрация</Link> :
        <div className="header__link-container">
         <p className="header__email">{email}</p>
          <button onClick={onSignOut} className="header__button">Выйти</button>
        </div> 
        }
      </nav>
    </div>
  )
}

export default Header;