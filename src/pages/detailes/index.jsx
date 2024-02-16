import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context"

export default function Details() {
    const {id} = useParams()
    const {recipeDetailsData, setRecipeDetailsData, favoritesList, handleAddFavorite} = useContext(GlobalContext)

    useEffect(() => {
        async function getRecipeDetails(){
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
            const data = await res.json()
            
            if(data?.data?.recipe){
                setRecipeDetailsData(data.data.recipe)
            }
        }

        getRecipeDetails()
    }, [])

    return (
        <div className='container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='row-start-2 lg:row-start-auto'>
                <div className='h-96 overflow-hidden rounded-xl group'>
                    <img
                        src={recipeDetailsData?.image_url}
                        alt={recipeDetailsData?.title}
                        className='w-full h-full object-cover block group-hover:scale-105 duration-300'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <span className='text-sm text-black-700 font-medium'>{recipeDetailsData?.publisher}</span>
                <h3 className='font-bold text-2xl truncate text-black'>{recipeDetailsData?.title}</h3>
                <div>
                    <button onClick={() => handleAddFavorite(recipeDetailsData)} className='p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white'>
                        {
                            favoritesList && favoritesList.length > 0
                            && favoritesList.findIndex(item => item.id === recipeDetailsData.id) !== -1 ? 'Remove from favorites' : 'Add to Favorites'
                        }
                    </button>
                </div>
                <div>
                    <span className='text-2xl font-semibold text-black'>Ingredients</span>
                    <ul className='flex flex-col mt-3 gap-3'>
                        {
                            recipeDetailsData?.ingredients.map((ingredient, index) => (
                                <li key={index} className='text-sm text-black-700'>
                                    <span className='text font-semibold text-black-700'>{ingredient.quantity} {ingredient.unit}</span>
                                    <span className='text font-semibold text-black-700'>{ingredient.description}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
