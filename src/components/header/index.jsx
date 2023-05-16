import cn from 'classnames';

import s from './styles.module.css'
import { Button } from '../button';

export function Header({ children, user, onUpdateUser }) {

  const handleClickButtonEdit = () => {
    onUpdateUser({name: 'Вася', about: 'Ментор'})
  }

  return (
    <header className={s.header}>
      <div className={cn('container', s.header__wrapper)}>
        {children}
        <span>{user?.name}: {user?.about}</span>
        <span>{user?.email}</span>
        <Button action={handleClickButtonEdit}>
            Изменить
        </Button>
      </div>
    </header>
  );
}



// {user && <span>{user.name}: {user.about}</span>}
// {user && <span>{user.email}</span>}

// export default App;
