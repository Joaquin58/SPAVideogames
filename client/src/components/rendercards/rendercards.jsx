
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardPage from '../cardpage/cardpage'
import { getVideogames, killcomponent } from '../../redux-toolkit/actions'
import render from "./render.module.css"


export default function RenderCards() {
    const dispatch = useDispatch()
    const allVideogames = useSelector(({ videogames }) => videogames.videogames)
    const Videogames = useSelector(({ videogames }) => videogames.allVideogames)
    const loader = useSelector(({ videogames }) => videogames.loadinggames)

    useEffect(() => {
        dispatch(getVideogames())
        return dispatch(killcomponent())
    }, [dispatch])

    const vg = Videogames.slice(0, 15)

    function _prerender() {
        let prerender = []
        for (let i = 0; i < 15; i++) {
            prerender.push(<CardPage key={`${i}`} />)
        }
        return prerender
    }

    return (
        <div className={render.flexbox}>
            {
                !loader ?
                    vg.map((el) => <CardPage key={el.id} name={el.name} image={el.image} genres={el.genres} id={el.id} />)
                    : <>{_prerender()}</>
            }
        </div>
    )
}





