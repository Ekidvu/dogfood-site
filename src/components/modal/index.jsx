import cn from 'classnames';
import s from './styles.module.css'
import { createPortal } from 'react-dom';

function Modal({ children, isOpen, onClose }) {
    // const [active, setActive] = useState(false);
    const renderContent = () => {
        return (<div className={cn(s.modal, { [s.modal_active]: isOpen })} onMouseDown={onClose}>
            <div className={cn(s.modal__content, { [s.modal__content_active]: isOpen })} onMouseDown={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>);
    }

    return createPortal(renderContent(), document.getElementById('modal-root'));
}

export default Modal;

