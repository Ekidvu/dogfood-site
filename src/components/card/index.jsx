import './styles.css'
import likeIcon from '../../images/save.svg'

export function Card({name, price, discount, weight, description, picture, ...props}) {
  // console.log(props);
  const discount_price = Math.round(price - price*discount / 100);
  return (
    <article className='card'>
        <div className="card__stickers card__stickers_type_top-left">
          {discount !== 0 && <span className='card__discount'>{`-${discount}%`}</span>} 
        </div>
        <div className="card__stickers card__stickers_type_top-right">
          <button className='card__favorite'>
            <img src={likeIcon} alt="" className='card__favorite-icon' />
          </button>
        </div>

        <a href="#" className='card__link'>
          <img src={picture} className='card__image' alt={name} />
          <div className="card__desc">
            <span className={discount !== 0 ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>
            {discount !== 0 && <span className="card__price card__price_type_discount">{discount_price}&nbsp;₽</span>}
            <span className="card__weight">{weight}</span>
            <h3 className="card__name">{name}</h3>
          </div>
        </a>
        <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
    </article>
  );
}





// export default App;
