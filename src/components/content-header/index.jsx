import { Link } from 'react-router-dom';
import s from './styles.module.css';

export function ContentHeader({ title, children, to, textButton }) {
    return (
        <>
            <Link className={s.buttonBack} to={to || -1}>
                {textButton}
            </Link>
            <h1 className={s.title}>{title}</h1>
            {children}
        </>
    );
}

{/* <a href='#' className={s.buttonBack} onClick={() => navigate(to || -1)}>
{textButton}
</a> */}