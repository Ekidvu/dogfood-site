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

export function App() {

  const [cards, setCards] = useState(dataCard);
  const [searchQuery, setSearchQuery] = useState("")

  function handleRequest() {
    const filterCards = dataCard.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    setCards(filterCards)
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest()
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }  

  // useEffect(() => {
  //   handleRequest();
  // }, [searchQuery])

  return (
    <>
        <Header>
          <Logo />
          <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange}/>
        </Header>
        <main className="content container">
          <Sort/>
          <CardList goods={cards} />
        </main>
        <Footer />
    </>
  );
}





// export default App;

// {/* <Button htmlType='button' type='primary' extraClass={s.button}>Купить</Button>
// <Button htmlType='button' type='secondary'>Отложить</Button>
// <Button htmlType='button' type='error'>Купить</Button> */}