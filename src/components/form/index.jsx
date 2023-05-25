import { useState } from 'react';
import s from './styles.module.css'

function Form({ handleFormSubmit, title, children }) {

    return (
        <form className={s.form} onSubmit={handleFormSubmit}>
            {title && <h3 className={s.title}>{title}</h3>}
            {children}
        </form>
    );
}

export default Form;



// const [contactInfo, setContactInfo] = useState({
//     name: "",
//     lastname: "",
//     phoneNumber: ""
// });

// const handleChange = (evt) => {
//     setContactInfo({ ...contactInfo, [evt.target.name]: evt.target.value })
// }

// const handleSubmit = (evt) => {
//     evt.preventDefault();
//     console.log(contactInfo);
//     handleForm(contactInfo);
//     setContactInfo({
//         name: "",
//         lastname: "",
//         phoneNumber: ""
//     })
// }

// {/* <form>
// <label>Введите имя:
//   <input type="text" />
// </label>
// </form> */}