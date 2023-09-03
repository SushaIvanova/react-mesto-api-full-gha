import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContexts";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__container">
          <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <p className="profile__info-caption">{currentUser.about}</p>
            <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Изменить"></button>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
      </section>
      <section className="elements section">
        <ul className="elements__table">
          {
            cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)
          }
        </ul>
      </section>
    </main>
  )


  
}

export default Main;