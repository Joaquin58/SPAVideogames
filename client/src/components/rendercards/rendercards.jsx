
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardPage from '../cardpage/cardpage'
import { getVideogames } from '../../redux-toolkit/actions'
const RenderCards = () => {
    const dispatch = useDispatch()
    const allVideogames = useSelector(({ videogames }) => videogames.videogames)
    const Videogames = useSelector(({ videogames }) => videogames.allVideogames)
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])
    return (
        <> {Array.isArray(Videogames) && Videogames.map((el) => <CardPage key={el.id} name={el.name} image={el.image} genres={el.genres} id={el.id} />)

        }
        </>
    )
}

export default RenderCards