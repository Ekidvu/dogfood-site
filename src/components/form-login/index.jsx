import { useForm } from 'react-hook-form'
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';
import s from './styles.module.css'
import cn from 'classnames';

function Login({ onSubmit, onNavigateRegister, onNavigateReset, modal, path }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    // const handleClickNavigateButton = (e) => {
    //     e.preventDefault();
    //     navigate('/register', {replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath }})
    // }
    // console.log("Login", modal, path);

    const emailRegister = register('email', {
        required: {
            value: true,
            message: '¡Обязательное поле!'
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Формат такой электронной почты, друже, не соотвествует  реалиям замысла!"
        }
    })

    const passwordRegister = register('password', {
        required: {
            value: true,
            message: '¡Обязательное поле!'
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Не соблаговолите ли вы, сэр, придумать тут минимум восемь символов, одну букву латинского алфавита и минимум одну такую одиношеньку цифру? Плиз."
        }
    })

    return (
        <Form title='Вход' handleFormSubmit={handleSubmit(onSubmit)}>
            <FormInput
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
            />
            {errors.email && <p className="errorMessage">{errors.email.message}</p>}
            <FormInput
                {...passwordRegister}
                id='password'
                type='password'
                placeholder='Пароль'
            />
            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
            <p className={cn('infoText', s.link)} onClick={onNavigateReset} modal={modal}>Восстановить пароль</p>

            <FormButton type="submit" color="primary">Войти</FormButton>
            <FormButton type="button" color="secondary" onClick={onNavigateRegister} modal={modal} path={path}>Регистрация</FormButton>
        </Form>
    );
}

export default Login;

// {/* <form>
// <label>Введите имя:
//   <input type="text" />
// </label>
// </form> */}