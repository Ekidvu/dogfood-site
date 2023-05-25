import { useForm } from 'react-hook-form'
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';

function ResetPassword({ onSubmit, modal }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    // const cbSubmitForm = (dataForm) => {
    //     console.log('errors', errors);
    //     console.log('dataForm', dataForm);
    // }

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

    return (
        <Form title='Восстановление пароля' handleFormSubmit={handleSubmit(onSubmit)}>
            <p className="infoText">Для получения временного пароля необходимо ввести email, указанный при регистрации.</p>
            <FormInput
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
            />
            {errors.email && <p className="errorMessage">{errors.email.message}</p>}

            <p className="infoText">Срок действия временного пароля 24 ч.</p>
            <FormButton type="submit" color="primary" modal={modal}>Отправить</FormButton>
        </Form>
    );
}

export default ResetPassword;

// {/* <form>
// <label>Введите имя:
//   <input type="text" />
// </label>
// </form> */}