import { Card } from '../card';
import './styles.css'


// import { v4 as uuidv4 } from 'uuid';

// const dataCardsWithId = dataCard.map(item => ({...item, id: uuidv4()}))

export function CardList({ goods, onProductLike, currentUser }) {
  return (
    <div className='cards content__cards'>
        {goods.map((dataItem, index) => (
        <Card key={index} {...dataItem} onProductLike={onProductLike} currentUser={currentUser} />
        ))}        
    </div>
  );
}

// console.log(dataCardsWithId);



// export default App;
