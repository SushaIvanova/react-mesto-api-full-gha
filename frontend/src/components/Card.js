import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContexts";

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUserInfo._id;

  const isLiked = card.likes.some(i => i === currentUserInfo._id);

  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <div className="card">
      {isOwn && <button type="button" className="card__delete-button" aria-label="Удалить" onClick={handleDeleteClick}/>}
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="card__caption-container">
        <h2 className="card__caption-text" >{card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} aria-label="Мне нравится" onClick={handleLikeClick}></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>    
  );                     
}

export default Card;