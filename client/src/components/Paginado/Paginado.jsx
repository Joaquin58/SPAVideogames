import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { savePage } from '../../redux-toolkit/actions.js'
import PaginadoStyles from '../Paginado/Paginado.module.css'

export default function Paginado({ videogamesForPage, allvideogames, paginado, currentPage }) {

    //!cambiar el estilo de la paginacion para que sean proporcionales los espacios ebtre ellos
    const dispatch = useDispatch()
    const state = useSelector(({general}) => general.statePag)

    const hundleActive = (e) => {
        e.preventDefault()
        const clicked = e.target.id
        dispatch(savePage(clicked))

    }

    const pageNumbers = []
    for (let i = 2; i <= Math.ceil(allvideogames / videogamesForPage); i++) {
        pageNumbers.push(i)
    }
    let lastPage = pageNumbers[pageNumbers.length - 1]
    return (
        <ul className={PaginadoStyles.paginado}>
            <li>
                <a href={`#?pag=${pageNumbers.length < 0 && 1 > currentPage - 1 ? currentPage : currentPage - 1}`}
                    onClick={(e) => { paginado(1 > currentPage - 1 ? currentPage : currentPage - 1); hundleActive(e) }}
                    className={PaginadoStyles.prev}
                    id={1 > currentPage - 1 ? currentPage : currentPage - 1}
                >Prev</a>
            </li>
            <li className={state === '1' || state === '' ? `${PaginadoStyles.pgNum} ${PaginadoStyles.active}` : PaginadoStyles.pgNum}
                key={1}
            >
                <a href="#?pag=1" onClick={(e) => { paginado(1); hundleActive(e) }} id='1'>1</a>
            </li>
            {pageNumbers && pageNumbers.map((num) => {
                return <li className={state === `${num}` ? `${PaginadoStyles.pgNum} ${PaginadoStyles.active}` : PaginadoStyles.pgNum} key={num}>
                    <a href={`#?pag=${num}`}
                        onClick={(e) => { paginado(num); hundleActive(e) }}
                        id={`${num}`}
                    >{num}</a>
                </li>
            })
            }
            <li>
                <a href={`#?pag=${pageNumbers.length > 0 && lastPage > currentPage + 1 ? currentPage + 1 : currentPage }`}
                    onClick={(e) => { 
                        paginado(pageNumbers.length > 0 && lastPage >= currentPage + 1 ? currentPage + 1 : currentPage );
                        hundleActive(e) 
                    }}
                    className={PaginadoStyles.next}
                    id={pageNumbers.length > 0 && lastPage >= currentPage + 1 ? currentPage + 1 : currentPage }
                >Next</a>
            </li>
        </ul>
    )
}
