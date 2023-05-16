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

export function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const debounceSearchQuery = useDebounce(searchQuery, 300)

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
    // const isLiked = product.likes.some(id => id === currentUser._id);
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        });
        setCards(newProducts)
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery])

  useEffect(() => {
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
  }, [])



  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <Logo />
        <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} />
      </Header>
      <main className="content container">
        <Sort />
        <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
      </main>
      <Footer />
    </>
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