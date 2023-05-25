import s from './styles.module.css';
import { ReactComponent as StarIcon } from './img/star.svg';
import { ReactComponent as StarHalfIcon } from './img/star-half.svg';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const MAX_COUNT_RATING = 5;

function Rating({ isEditable = false, currentRating, setCurrentRating, reviews }) {
    const [ratingArray, setRatingArray] = useState(new Array(MAX_COUNT_RATING).fill(<></>));

    const ratingPure = !!reviews?.length ? reviews.reduce((acc, el) => acc + el.rating, 0) / reviews.length : 0;


    const constructRating = (fillRating) => {
        const updateArray = ratingArray.map((ratingElement, index) => {
            if (index === Math.floor(ratingPure) && ratingPure > Math.floor(ratingPure) + 0.5) ratingElement =
                <StarHalfIcon className={cn(s.star, {
                    [s.editable]: isEditable
                })} />;
            else ratingElement =
                <StarIcon className={cn(s.star, {
                    [s.filled]: index < fillRating,
                    [s.editable]: isEditable
                })} onMouseEnter={() => changeDisplay(index+1)} 
                    onMouseLeave={() => changeDisplay(currentRating)} 
                    onClick={() => changeRating(index+1)}
            />;
            return ratingElement;
        });
        setRatingArray(updateArray)
    }

    function changeDisplay(rating) {
        constructRating(rating)
    }
    function changeRating(rating) {
        if (!isEditable || !setCurrentRating) return
        setCurrentRating(rating);
    }

    useEffect(() => {
        constructRating(currentRating)
    }, [currentRating])

    return (
        ratingArray.map((r, i) => <span key={i}>{r}</span>)
    );
}

export default Rating;


    // currentRating = Math.floor(ratingPure);
    // console.log("ratingPure", ratingPure, "currentRating", currentRating);
// onMouseLeave={() => constructRating(currentRating)}

// const constructRating = (currentRating) => {

//     const updateArray = ratingArray.map((ratingElement, index) =>
//     <>
//         <StarIcon
//             className={cn(s.star,
//                 {
//                     [s.filled]: index < currentRating,
//                     [s.editable]: isEditable,
//                 })}
//         />

//     </>
//     );
//     setRatingArray(updateArray)
// }

// useEffect(() => constructRating(currentRating), [currentRating])