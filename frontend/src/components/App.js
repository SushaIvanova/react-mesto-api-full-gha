import React, { useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import { api } from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContexts";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth.js';
import {useNavigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const navigate = useNavigate();
  const[loggedIn, setLoggedIn] = React.useState(false);
  const[email, setEmail] = React.useState(null);
  const[isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const[isSignUpSuccess, setIsSignUpSuccess] = React.useState(false);
  const[isEditProfilePopupLoading, setIsEditProfilePopupLoading] = React.useState(false);
  const[isAddPlacePopupLoading, setIsAddPlacePopupLoading] = React.useState(false);
  const[isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = React.useState(false);
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard, setSelectedCard] = React.useState(null);
  const[currentUser, setCurrentUser] = React.useState({});
  const[cards, setCards] = React.useState([]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token){
      auth.getContent(token)
      .then((res) => {
        setEmail(res.email);
        setLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch(err => {
        console.log(err);
      })
    } 
  }

  const [formValue, setFormValue] = React.useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleRegister() {
    const {password, email} = formValue;
    auth.register(password, email)
    .then((res) => {
      setIsInfoTooltipPopupOpen(true);
      setIsSignUpSuccess(true);
      navigate('/signin', {replace: true});
    })
    .catch(err => {
      setIsInfoTooltipPopupOpen(true);
      setIsSignUpSuccess(false);
      console.log(err);
    }); 
  }

  const handleLogin = () => {
    const {password, email} = formValue;
    auth.authorize(password, email)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setEmail(email);
      setLoggedIn(true);
      setFormValue({
        password: '',
        email: ''
      });
      navigate('/', {replace: true});
      
    })
    .catch(err => {
      console.log(err);
    }); 
  }
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setEmail(null);
    setLoggedIn(false);
    navigate('/signin', {replace: true});
  }

  React.useEffect(() => {
    if(loggedIn) {
      const token = localStorage.getItem('token');
      Promise.all([api.getUserInfo(token), api.getCards(token)])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch((error) => console.log(`Ошибка ${error}`));
      }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    if(isLiked) {
      const token = localStorage.getItem('token');
      api.deleteLike(card._id, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error => console.log(`Ошибка ${error}`)))
    } else {
      const token = localStorage.getItem('token');
      api.setLike(card._id, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error => console.log(`Ошибка ${error}`)))
    } 
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem('token');
    api.deleteCard(card._id, token)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error => console.log(`Ошибка ${error}`)))
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (data) => {
    setIsEditProfilePopupLoading(true);
    const token = localStorage.getItem('token');
    api.editProfile(data, token)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((error) => {
      console.log('Ошибка при отправке данных на сервер:', error);
    })
    .finally(() => {
      setIsEditProfilePopupLoading(false);
    })
  }

  const handleUpdateAvatar = (data) => {
    setIsEditAvatarPopupLoading(true);
    const token = localStorage.getItem('token');
    api.editAvatar(data, token)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(error => {console.log('Ошибка', error);
    })
    .finally(() => {
      setIsEditAvatarPopupLoading(false);
    })
  }

  const handleAddPlaceSubmit = (data) => {
    setIsAddPlacePopupLoading(true);
    const token = localStorage.getItem('token');
    api.addNewCard(data, token)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch(error => {console.log('Ошибка', error);
    })
    .finally(() => {
      setIsAddPlacePopupLoading(false);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header email={email} onSignOut={handleSignOut} />
          <Routes>
            <Route path="/" element={
            <ProtectedRoute
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} 
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              />} 
            />
            <Route path="/signup" element={<Register onRegister={handleRegister} onChange={handleChange} formValue={formValue} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} onChange={handleChange} formValue={formValue}/>} />
          </Routes>
          
          <Footer />
          <InfoTooltip
           isOpen={isInfoTooltipPopupOpen} 
           onClose={closeAllPopups}
           isSuccess={isSignUpSuccess} />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} 
            isLoading={isEditProfilePopupLoading}
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit} 
            isLoading={isAddPlacePopupLoading} 
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} 
            isLoading={isEditAvatarPopupLoading} 
          />
          <ImagePopup name='image' card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;