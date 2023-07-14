import cn from 'classnames';
import { Button } from '../button';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ToggleThemeButton } from '../toggle-theme-button';
import s from './styles.module.css'
import { CardsContext } from '../../contexts/card-context';
import { ReactComponent as FavouriteIcon } from './img/favourites.svg'
import { ReactComponent as LogoutIcon } from './img/logout.svg'
import { ReactComponent as CartIcon } from './img/cart.svg'
import { ReactComponent as ProfileIcon } from './img/profile.svg'
import { ReactComponent as UserIcon } from './img/user.svg'

export function Header({ children }) {
  const location = useLocation();
  const { currentUser, onUpdateUser } = useContext(UserContext);
  const { favourites } = useContext(CardsContext);

  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Боронин Илья Владимирович', about: 'фантаст мелодий' })
  }

  return (
    <header className={s.header}>
      <div className={cn('container', s.header__wrapper)}>
        {children}
        <div className={cn({
          [s.header_block]: location.pathname === '/catalog',
          [s.header_no_search]: location.pathname !== '/catalog'
        })}>
          <span className={s.user_header}>{currentUser?.name}: {currentUser?.about}</span>
          <span>{currentUser?.email}</span>
          <Button action={handleClickButtonEdit}>
            Изменить
          </Button>
        </div>
        <div className={s.iconsMenu}>
          <Link className={s.favouritesLink} to={{pathname: '/favourites'}}>
            <FavouriteIcon />
            {favourites.length !== 0 && <span className={s.iconBubble}>{favourites.length}</span>}
          </Link>

          <Link className={s.favouritesLink} to={{pathname: '/cart'}}>
            <CartIcon />
            {favourites.length !== 0 && <span className={s.iconBubble}>{favourites.length}</span>}
          </Link>

          <Link to='/login' className={s.iconsMenuItem} state={{backgroundLocation: location, initialPath: location.pathname}} replace>
            <UserIcon />
            Войти
            </Link>

          <Link className={s.iconsMenuItem} to={{pathname: '/profile'}}>
            <ProfileIcon />
            Макуцва
          </Link>

          <Link className={s.iconsMenuItem} to={{pathname: '/'}}>
            <LogoutIcon />
            Выйти
          </Link>
        </div>
        <ToggleThemeButton />
      </div>
    </header>
  );
}

// style={{gridColumnStart: -1}}

// {user && <span>{user.name}: {user.about}</span>}
// {user && <span>{user.email}</span>}

// export default App;

  // const searchElement = document.querySelector('.search');
  // const authorElement =
  //   <>
  //     <span className={s.user_header}>{user?.name}: {user?.about}</span>
  //     <span>{user?.email}</span>
  //     <Button action={handleClickButtonEdit}>
  //       Изменить
  //     </Button>
  //   </>;

  // console.log(children);
  // console.log(location.pathname.length);

        // {/* <div className={s.header_block}>
        //   <span className={s.user_header}>{user?.name}: {user?.about}</span>
        //   <span>{user?.email}</span>
        //   <Button action={handleClickButtonEdit}>
        //       Изменить
        //   </Button>
        // </div> */}

        // {!!searchElement
        //   ?
        //   <div className={s.header_block}>
        //     {authorElement}
        //   </div>
        //   :
        //   {...authorElement}
        // }


      //   <header className={s.header}>
      //   <div className={cn('container', s.header__wrapper)}>
      //     {children}
      //     <div className={s.header_block}>
      //       <span className={s.user_header}>{user?.name}: {user?.about}</span>
      //       <span>{user?.email}</span>
      //       <Button action={handleClickButtonEdit}>
      //         Изменить
      //       </Button>
      //     </div>
      //   </div>
      // </header>