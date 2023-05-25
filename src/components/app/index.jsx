import { useEffect, useState } from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';
import { ThemeContext, themes } from '../../contexts/theme-context';
import { FavouritesPage } from '../../pages/favourite-page';
import { TABS_ID } from '../../utils/constants';
import Form from '../form';
// import RegisterForm from '../form/register-form';
import Modal from '../modal';
import RegisterForm from '../form-register';
import Login from '../form-login';
import ResetPassword from '../form-reset-password';

export function App() {
  const [cards, setCards] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const [currentSort, setCurrentSort] = useState('');
  const [modalFormStatus, setModalFormStatus] = useState(false);

  const [contacts, setContacts] = useState([]);
  const debounceSearchQuery = useDebounce(searchQuery, 300);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;


  const onCloseModalForm = () => {
    setModalFormStatus(false);
  }

  const onCloseRoutingModal = () => {
    navigate(initialPath || '/catalog', { replace: true })
  }

  function handleRequest() {
    // const filterCards = dataCard.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    // setCards(filterCards)

    api.search(debounceSearchQuery)
      .then((dataSearch) => setCards(dataSearch))
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest()
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromDerver) => {
        setCurrentUser(updateUserFromDerver)
      })
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    return api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        });
        setCards(newProducts)
        console.log(updateCard.likes);

        if (!like) {
          setFavourites(prevState => [...prevState, updateCard])
        } else {
          setFavourites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }
        return updateCard;
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery])

  useEffect(() => {
    setIsLoading(true)
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);

        const favouriteProducts = productsData.products.filter(item => isLiked(item.likes, userInfoData._id))
        setFavourites(favouriteProducts)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  function sortedData(currentSort) {
    console.log(currentSort);

    switch (currentSort) {
      case (TABS_ID.CHEAP):
        setCards(cards.sort((a, b) => a.price - b.price));
        break;
      case (TABS_ID.EXPENSIVE):
        setCards(cards.sort((a, b) => b.price - a.price));
        break;
      case (TABS_ID.RATED):
        setCards(cards.sort((a, b) => b.likes.length - a.likes.length));
        break;
      case (TABS_ID.DISCOUNTS):
        setCards(cards.sort((a, b) => b.discount - a.discount));
        break;
      default: cards.sort((a, b) => b.price - a.price);
        break;
    }
  }

  function toggleTheme() {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark)
  }

  function addContact(dataInfo) {
    setContacts([...contacts, dataInfo])
  }

  const cbSubmitFormLoginRegister = (dataForm) => {
    console.log('cbSubmitFormLoginRegister', dataForm);
  }
  const cbSubmitFormLogin = (dataForm) => {
    console.log('cbSubmitFormLogin', dataForm);
  }
  const cbSubmitFormResetPassword = (dataForm) => {
    console.log('cbSubmitFormResetPassword', dataForm);
  }

  const handleClickButton = (e) => {
      e.preventDefault();
      const path = e.target.getAttribute('path'), modal = e.target.getAttribute('modal');
      const propsForBackground = { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } };
      modal ? navigate(`/${path}`, propsForBackground) : navigate(`/${path}`);
      console.log('path', path);
      console.log('modal', modal);
  }
  const handleClickButtonReset = (e) => {
    e.preventDefault();
    const modal = e.target.getAttribute('modal');
    const propsForBackground = { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } };
    modal ? navigate('/reset-password', propsForBackground) : navigate('/reset-password')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CardsContext.Provider value={{
        cards,
        favourites,
        currentSort,
        handleLike: handleProductLike,
        isLoading,
        onSortData: sortedData,
        setCurrentSort
      }}>
        <UserContext.Provider value={{ currentUser, onUpdateUser: handleUpdateUser }}>
          {/* <Form handleForm={addContact} /> */}
          {/* {contacts.map(contact => <p>{`${contact.name}, ${contact.lastname}, ${contact.phoneNumber}`}</p>)} */}

          {/* <Modal isOpen={modalFormStatus} onClose={onCloseModalForm}>
            <RegisterForm />
          </Modal> */}

          <Header user={currentUser}>
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
              <Route path='/catalog' element={
                <>
                  <Logo />
                  <Search
                    handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange}
                  />
                </>
              } />
              <Route path='*' element={<Logo href={'/'} />} />
            </Routes>
          </Header>
          <main className="content container" style={{ backgroundColor: theme.background }}>
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
              <Route path='/catalog' element={<CatalogPage handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading}></CatalogPage>} />
              <Route path='/favourites' element={<FavouritesPage />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/product/:productID' element={<ProductPage />} />

              <Route path='/login' element={
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButton} path='register' modal='false' onNavigateReset={handleClickButtonReset} />
              } />
              <Route path='/register' element={
                <RegisterForm onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButton} path='login' modal='false' />
              } />
              <Route path='/reset-password' element={
                <ResetPassword onSubmit={cbSubmitFormResetPassword} modal='false' />
              } />

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            {/* <Sort />
        <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/> */}
          </main>
          <Footer />

          {backgroundLocation && <Routes>
            <Route path='/login' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButton} path='register' modal='true' onNavigateReset={handleClickButtonReset} />
              </Modal>
            } />
            <Route path='/register' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <RegisterForm onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButton} path='login' modal='true' />
              </Modal>
            } />
            <Route path='/reset-password' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <ResetPassword onSubmit={cbSubmitFormResetPassword} modal='true' />
              </Modal>
            } />
          </Routes>}
          
        </UserContext.Provider>
      </CardsContext.Provider>
    </ThemeContext.Provider>
  );
}



  // const handleClickButtonLogin = (e) => {
  //   e.preventDefault();
  //   navigate('/login', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  // }
  // const handleClickButtonRegister = (e) => {
  //   e.preventDefault();
  //   navigate('/register', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  // }
  // const handleClickButtonReset = (e) => {
  //   e.preventDefault();
  //   navigate('/reset-password', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  // }
  // const handleClickButtonRegisterNotModal = (e) => {
  //   e.preventDefault();
  //   navigate('/register')
  // }
  // const handleClickButtonResetNotModal = (e) => {
  //   e.preventDefault();
  //   navigate('/reset-password')
  // }
  // const handleClickButtonLoginNotModal = (e) => {
  //   e.preventDefault();
  //   navigate('/login')
  // }

              // <Route path='/login' element={
              //   <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegisterNotModal} onNavigateReset={handleClickButtonResetNotModal} />
              // } />
              // <Route path='/register' element={
              //   <RegisterForm onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLogin} />
              // } />
              // <Route path='/reset-password' element={
              //   <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              // } />

// useEffect(() => {
//   handleRequest();
// }, [searchQuery])

  // useEffect(() => {
  //   console.log('currentUser', currentUser);
  // }, [currentUser])

// const [cards, setCards] = useState(dataCard);

// useEffect(() => {
//   api.getProductsList()
//     .then(data => setCards(data.products))
//     .catch(err => console.log(err))

//   api.getUserInfo()
//     .then(data => setCurrentUser(data))
//     .catch(err => console.log(err))
// }, [])

// export default App;

// {/* <Button htmlType='button' type='primary' extraClass={s.button}>Купить</Button>
// <Button htmlType='button' type='secondary'>Отложить</Button>
// <Button htmlType='button' type='error'>Купить</Button> */}


// {/* <Route path='/login' element={
//   <Modal isOpen onClose={onCloseRoutingModal}>
//     <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegister} onNavigateReset={handleClickButtonReset} />
//   </Modal>
// } />
// <Route path='/register' element={
//   <Modal isOpen onClose={onCloseRoutingModal}>
//     <RegisterForm onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLoginNotModal} />
//   </Modal>
// } />
// <Route path='/reset-password' element={
//   <Modal isOpen onClose={onCloseRoutingModal}>
//     <ResetPassword onSubmit={cbSubmitFormResetPassword} />
//   </Modal>
// } /> */}