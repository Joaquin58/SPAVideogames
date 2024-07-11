
import React from 'react'
import { useSelector } from 'react-redux'
import CardPage from '../cardpage/cardpage'
import render from "./render.module.css"


export default function RenderCards({ current }) {

    const loader = useSelector(({ videogames }) => videogames.loadinggames)

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
                    current.map((el) => <CardPage key={el.id} name={el.name} image={el.image} genres={el.genres} id={el.id} />)
                    : <>{_prerender()}</>
            }
        </div>
    )
}





