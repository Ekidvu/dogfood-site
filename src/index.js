import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import './styles.css';

import { App } from './components/app';
import { Provider } from 'react-redux';
import store from './storage/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>

);

// root.render(<StrictMode><App /></StrictMode>)

//---------------

// import logoImageSrc from './images/ReactLogo.png'
// import { ReactComponent as Logo} from './images/logo.svg'
// import logoSVGImageSrc from './images/logo.svg'


// const el = React.createElement(
//   'h1',
//   null,
//   React.createElement('span', null, 'Hello, World!')
// )

// const AppList = () => {
//   const items = ['Мой первый элемент', 'Мой второй элемент', 'Мой третий элемент', 'Мой курага гешефт']
//   return (
//       <ul>
//           {items.map((item, index) => {
//               return <li key={index}>{item}</li>
//           })}
//       </ul>
//     // <ul>
//     //   <li>Мой первый элемент</li>
//     //   <li>Мой второй элемент</li>
//     // </ul>
//   )
// }

// const AppInput = ({placeholder, label}) => {
//   // console.log(props);
//   // const placeholder = "Пример инпута";
//   return (
//     <div className='label'>
//       {label}
//       <input placeholder={placeholder} type="password"/>
//     </div>    
//   )
// }

// const AppHeader = ({title, children}) => { //undefined
//   return (
//     <div>
//       { children }
//       {/* <Logo />
//       <div className='imgDiv'>
//         <img className='image' src={  logoImageSrc } alt=''/> 
//         <img className='image' src={  logoSVGImageSrc } alt=''/>
//       </div> */}
      
//       {title && <h1 className='header-title'><span>{title}</span></h1>}
//     </div>
    
//   ) 
// }

// const App = () => {
//   return (
//     <>
//       <AppHeader title="Привет, мир!">
//         <Logo />  
//         <div className='imgDiv'>
//           <img className='image' src={  logoImageSrc } alt=''/>
//           <img className='image' src={  logoSVGImageSrc } alt=''/>
//         </div>
//       </AppHeader>
//       {/* <AppHeader /> */}
//       {/* <AppHeader title='Привет, мир! И ведь не просто!' /> */}
//       <AppList />
//       {/* <AppHeader title='Вот еще что! Второй заголовок!' /> */}
//       <AppInput placeholder="Введите ваше имя" label="Имя"/>
//       <AppInput placeholder="Введите ваш email" label="email"/>
//       <AppInput placeholder="Предзнаменование" label="Предзнаменование"/>
//       <AppInput placeholder="Введите вашу пургу" label="Пурга"/>
//     </>
//   )
// }



// const el = (
//   <>
//     <AppHeader />
//     <AppList />
//     <AppHeader />
//     {/* <AppList/>
//       <AppList/>
//       <AppList/> */}
//   </>

// );

// const el2 = <h1><span>Привет, мир! Я где-то не очень понятно где!</span></h1>;

// console.log(el);

// root.render(el1)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);