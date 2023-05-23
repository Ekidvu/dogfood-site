import { useContext } from "react"
import { CardList } from "../../components/card-list"
import { Spinner } from "../../components/spinner"

import { CardsContext } from "../../contexts/card-context"
import { ContentHeader } from "../../components/content-header"

export const FavouritesPage = () => {
    const { favourites: goods, isLoading } = useContext(CardsContext);

    return (
        <>
            {isLoading
                ? <Spinner />
                : <>
                    <ContentHeader title='Избранное' textButton="Назад" />
                    <CardList goods={goods} />
                </>
            }
        </>
    )
}


// {/* <>
// {isLoading
//     ? <Spinner />
//     : <>
//         <ContentHeader title='Избранное' textButton="Назад" />
//         <CardList goods={goods} />
//     </>
// }
// </> */}