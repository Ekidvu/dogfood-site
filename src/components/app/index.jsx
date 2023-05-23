import { useEffect, useState } from 'react';
import { CardList } from '../card-list';
import { Footer } from '../footer';
import { Header } from '../header';
import { Sort } from '../sort';
import { Logo } from '../logo';
import { Search } from '../search';
import { dataCard } from "../../data";
import s from './styles.module.css'
import { Button } from '../button';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';
import { ThemeContext, themes } from '../../contexts/theme-context';
import { FavouritesPage } from '../../pages/favourite-page';
import { TABS_ID } from '../../utils/constants';

export function App() {
  const [cards, setCards] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const [currentSort, setCurrentSort] = useState('');


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

        if(!like) {
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
        setCards(cards.sort((a,b)=> a.price-b.price));
        break;
      case (TABS_ID.EXPENSIVE):
        setCards(cards.sort((a,b)=> b.price-a.price));
        break;
      case (TABS_ID.RATED):
        setCards(cards.sort((a,b)=> b.likes.length-a.likes.length));
        break;
      case (TABS_ID.DISCOUNTS):
        setCards(cards.sort((a,b)=> b.discount-a.discount));
        break;
      default: cards.sort((a,b)=> b.price-a.price);
        break;
    }
  }

  function toggleTheme() {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark)
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
          <Header user={currentUser}>
            <Routes>
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
            <Routes>
              <Route path='/catalog' element={<CatalogPage handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading}></CatalogPage>} />
              <Route path='/favourites' element={<FavouritesPage />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/product/:productID' element={<ProductPage />} />
              <Route path='*' element={<NotFoundPage />} />
              {/* <Route path='/' element={} /> */}
            </Routes>

            {/* <Sort />
        <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/> */}
          </main>
          <Footer />
        </UserContext.Provider>
      </CardsContext.Provider>
    </ThemeContext.Provider>
  );
}


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