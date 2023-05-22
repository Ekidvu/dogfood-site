import { useContext } from 'react';
import s from './styles.module.css'
import { ThemeContext } from '../../contexts/theme-context';

export function ToggleThemeButton() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <label className={s.wraper} htmlFor="something">
        <span className={s['label-text']}></span>
        <div className={s['switch-wrap']}>
          <input type="checkbox" id="something" onChange={toggleTheme}/>
          <div className={s.switch}></div>
        </div>
      </label>
    </>
  );
}





// export default App;
