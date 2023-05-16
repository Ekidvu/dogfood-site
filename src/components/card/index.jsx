import './styles.css'
import { ReactComponent as LikeIcon } from '../../images/save.svg'
import cn from 'classnames';
import { Button } from '../button';
import { isLiked } from '../../utils/products';

export function Card({ name, price, discount, wight, description, pictures, tags, likes, _id, onProductLike, currentUser, ...props }) {
  // console.log(props);
  const discount_price = Math.round(price - price * discount / 100);

  // const isLiked = likes.some(id => id === currentUser._id);
  const like = isLiked(likes,currentUser?._id)

  function handleClickButtonLike() {
    console.log(likes);
    onProductLike({ likes, _id })
  }

  return (
    <article className='card'>
      <div className="card__stickers card__stickers_type_top-left">
        {discount !== 0 && <span className='card__discount'>{`-${discount}%`}</span>}
        {tags && tags.map(tagName => (
          <span key={tagName} className={cn('tag', { [`tag_type_${tagName}`]: true })}>{tagName}</span>
        )
        )}
      </div>
      <div className="card__stickers card__stickers_type_top-right">
        <button className={cn('card__favorite', { 'card__favorite_is-active': like })} onClick={handleClickButtonLike}>
          <LikeIcon className='card__favorite-icon' />
          {/* <img src={likeIcon} alt="" className='card__favorite-icon' /> */}
        </button>
      </div>

      <a href="#" className='card__link'>
        <img src={pictures} className='card__image' alt={name} />
        <div className="card__desc">
          <span className={discount !== 0 ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>
          {discount !== 0 && <span className="card__price card__price_type_discount">{discount_price}&nbsp;₽</span>}
          <span className="card__weight">{wight}</span>
          <h3 className="card__name">{name}</h3>
        </div>
      </a>
      <a href="#">
        <Button htmlType='button' type='primary' extraClass="card__cart">В корзину</Button>
      </a>
    </article>
  );
}


        // <a href="#" className="card__cart btn btn_type_primary">В корзину</a>


// export default App;
