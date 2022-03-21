import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import {savePage} from '../../redux/actions.js'
import PaginadoStyles from '../Paginado/Paginado.module.css'

export default function Paginado({ videogamesForPage, allvideogames, paginado, next, prev }) {

    //!cambiar el estilo de la paginacion para que sean proporcionales los espacios ebtre ellos
    const dispatch = useDispatch()
    const state = useSelector(state=>state.statePag)

    const hundleActive = (e) => {
        e.preventDefault()
        const clicked = e.target.id
        if (state === clicked) {
            dispatch(savePage(''))
        } else {
            dispatch(savePage(clicked))
        }
    }

    const pageNumbers = []
    for (let i = 2; i <= Math.ceil(allvideogames / videogamesForPage); i++) {
        pageNumbers.push(i)
    }
    return (

        <ul className={PaginadoStyles.paginado}>
            <li><a href="#" onClick={() => paginado(prev)} className={PaginadoStyles.prev}>Prev</a></li>
            <li className={state === '1' || state === '' ? `${PaginadoStyles.pgNum} ${PaginadoStyles.active}` : PaginadoStyles.pgNum} key={1}>
                <a href="#1" onClick={(e) => { paginado(1); hundleActive(e) }} id='1'>{1}</a>
            </li>
            {pageNumbers && pageNumbers.map((num) => {
                return <li className={state === `${num}` ? `${PaginadoStyles.pgNum} ${PaginadoStyles.active}` : PaginadoStyles.pgNum} key={num}>
                    <a href={`#${num}`} onClick={(e) => { paginado(num); hundleActive(e) }} id={`${num}`}>{num}</a>
                </li>
            })
            }
            <li><a href="#" onClick={() => paginado(next)} className={PaginadoStyles.next}>Next</a></li>
            {console.log(state)}
            {console.log(state === '')}
        </ul>
    )
}