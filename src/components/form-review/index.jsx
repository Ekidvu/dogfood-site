import { Controller, useForm } from 'react-hook-form'
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';
import Rating from '../rating';
import { useState } from 'react';

function FormReview({ title = 'Отзыв о товаре', productID, setProduct, reviews }) {

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' });
    // const [rating, setRating] = useState(5);

    const handleSubmitFormReview = (data) => {
        // console.log('handleSubmitFormReview', { ...data, rating });
        console.log('handleSubmitFormReview', data );
        reset();
        // setRating(5);
    }

    const textRegister = register('text', {
        required: {
            value: true,
            message: '¡Обязательное поле!'
        },
        pattern: {
            value: /.{5}/,
            message: "Минимум пять символов, амиго. Мы верим в вас!"
        }
    })

    return (
        <>
            <h2>{title}</h2>
            <Controller
                render={({ field }) => (<Rating currentRating={field.value} setCurrentRating={field.onChange} reviews={reviews} isEditable error={errors} />)}
                name="rating"
                control={control}
                defaultValue=""
                rules={{
                    required: {
                        value: true,
                        message: 'Укажите рейтинг!'
                    },
                }}
            />

            {/* <Rating currentRating={rating} setCurrentRating={setRating} reviews={reviews} isEditable /> */}
            <Form handleFormSubmit={handleSubmit(handleSubmitFormReview)}>
                <FormInput
                    {...textRegister}
                    typeTag='textarea'
                    id='text'
                    type='text'
                    placeholder='Напишите что-нибудь о товаре.'
                />
                {errors.text && <p className="errorMessage">{errors.text.message}</p>}

                <FormButton type="submit" color="primary">Отправить отзыв</FormButton>
            </Form>
        </>

    );
}

export default FormReview;

// {/* <form>
// <label>Введите имя:
//   <input type="text" />
// </label>
// </form> */}