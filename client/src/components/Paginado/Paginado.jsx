import React from "react";
import PaginadoStyles from '../Paginado/Paginado.module.css'

export default function Paginado({ videogamesForPage, allvideogames, paginado }) {
    const pageNumbers = []
    for (let i = 2; i <= Math.ceil(allvideogames/videogamesForPage); i++) {
        pageNumbers.push(i)
    }
    return (
        
            <ul className={PaginadoStyles.paginado}>
            <li className={PaginadoStyles.pgNum} key={1}>
                        <a href="#1" onClick={() => paginado(1)}>{1}</a>
                    </li>
                {pageNumbers && pageNumbers.map((num) => {
                    return <li className={PaginadoStyles.pgNum} key={num}>
                        <a href={`#${num}`} onClick={() => paginado(num)}>{num}</a>
                    </li>
                })
                }
            </ul>
        
    )
}