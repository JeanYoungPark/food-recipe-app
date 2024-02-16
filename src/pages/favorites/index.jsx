import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-item"

export default function Favorites() {
    const {favoritesList} = useContext(GlobalContext)

    return (
        <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
            {
                favoritesList && favoritesList.length > 0
                ? (
                    favoritesList.map((item, index) => (
                        <RecipeItem key={index} item={item}/>
                    ))
                )
                : (
                    <div className='lg:text-4xl text-al text-center text-black font-extrabold'>
                        <p>Nothing is added in favorites.</p>
                    </div>
                )
            }
        </div>
    )
}
