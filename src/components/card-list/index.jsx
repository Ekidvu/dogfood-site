import { useContext } from 'react';
import { Card } from '../card';
import './styles.css'
import { CardsContext } from '../../contexts/card-context';


// import { v4 as uuidv4 } from 'uuid';

// const dataCardsWithId = dataCard.map(item => ({...item, id: uuidv4()}))

export function CardList({ goods }) {
  return (
    <div className='cards content__cards'>
      {goods.map((dataItem, index) => (
        <Card key={dataItem._id} {...dataItem} />
      ))}
    </div>
  );
}

// console.log(dataCardsWithId);



// export default App;
