import cn from 'classnames';

import s from './styles.module.css'

export function Header({children}) {
  return (
    <header className={s.header}>
      <div className={cn('container', s.header__wrapper)}>
        {children}
      </div>
    </header>
  );
}





// export default App;
