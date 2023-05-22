import { useContext, useEffect, useState } from 'react'
import api from '../../utils/api'
import Product from '../../components/product';
import { isLiked } from '../../utils/products';
import { Spinner } from '../../components/spinner';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/not-found';
import { CardsContext } from '../../contexts/card-context';

// const ID_PRODUCT = '6451d04d8fbc473fa8a24b6e';

export const ProductPage = () => {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    const {handleLike} = useContext(CardsContext);

    function handleProductLike(product) {
        handleLike(product).then(updateCard => {
            setProduct(updateCard)
        })
    }

    useEffect(()=>{
        setIsLoading(true);
        api.getInfoProduct(productID)
            .then(([productData,userData]) => {
                setCurrentUser(userData)
                setProduct(productData)
            })
            .catch((err) => {
                setErrorState(err);
                console.log('Ошибка на стороне сервера');
            })
            .finally(() => {
                setIsLoading(false)
            }) 
    },[])

    return (
        <>
            {isLoading
                ? <Spinner />
                : !errorState && <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
            }

            {!isLoading && errorState && <NotFound title="Товар не найден" />}
        </>
    )
} 

// '622c77e877d63f6e70967d22'

// function handleProductLike(product) {
//     handleLike(product).then(updateCard => {
//         setProduct(updateCard)
//     })
//     const like = isLiked(product.likes, currentUser._id)
//     api.changeLikeProductStatus(product._id, like)
//       .then((updateCard) => {
        
//       })
//   }