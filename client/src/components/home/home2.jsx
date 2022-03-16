import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {
    getVideogames,
    getGenres,
    // orderVideogamesByName,
    orderVideogamesByRaiting,
    orderVideogamesByNameBk
} from '../../redux/actions.js'

import SearchBar from "../Search/SearchBar.jsx";
import Card from '../Card/card.jsx'
import Paginado from '../Paginado/Paginado.jsx'
import FiltroGenre from '../Filtro/Filtro.jsx'
import Loading from '../images/charge.gif'
import NotFound from '../images/gameovertransparent.png'
import NotResults from '../images/not-found-icon-15.jpg'
import HomeStyles from '../home/home.module.css'
export default function Home() {

    const dispatch = useDispatch()

    const allVideogames = useSelector((state) => state.videogames)
    const Videogames = useSelector((state) => state.allVideogames)
    const name = useSelector(state=>state.savename)
    //*--- Estados Locales ---*
    const [CuerrentPage, setCurrentPage] = useState(1)
    const [VideogamesforPage] = useState(15)
    const [, setOrden] = useState('')

    //* --- Paginado ---*
    if (Array.isArray(allVideogames)) {
        var indexOfLastVideogame = CuerrentPage * VideogamesforPage
        var idexOfFirstPage = indexOfLastVideogame - VideogamesforPage
        var currentVideogames = allVideogames.slice(idexOfFirstPage, indexOfLastVideogame)
    }

    const paginado = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        console.log('entra')
        dispatch(getVideogames())
        dispatch(getGenres())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames())
    }
    function handleOrderAlfabet(e) {
        e.preventDefault()
        dispatch(orderVideogamesByNameBk(name,e.target.value))
        setCurrentPage(1)
        //modifica el estado local para que se renderize por un cambio
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleOrderRating(e) {
        e.preventDefault()
        dispatch(orderVideogamesByRaiting(e.target.value))
        setCurrentPage(1)
        //modifica el estado local para que se renderize por un cambio
        setOrden(`Ordenado ${e.target.value}`)
    }
    return (
        <>
            {
                Array.isArray(allVideogames) && Videogames.length > 0 ?
                    <>
                        <nav className={HomeStyles.nav}>
                            <Link to='/makevideogame'>
                                <button className={HomeStyles.buttonadd}>Agregar Videogame</button>
                            </Link>
                            <h1>Videogames</h1>
                            <button className={HomeStyles.button} onClick={e => handleClick(e)}>Recargar Página</button>
                            <SearchBar />
                            <div className={HomeStyles.selecters}>
                                <FiltroGenre />
                                <select className={HomeStyles.select} defaultValue='' onChange={e => handleOrderAlfabet(e)}>
                                    <option value='' disabled >Ordena por orden alfabetico</option>
                                    <option value='asd'>Ascendente</option>
                                    <option value='des'>Descendente</option>
                                </select>
                                <select className={HomeStyles.select} defaultValue='' onChange={e => handleOrderRating(e)}>
                                    <option value='' disabled>Ordena por rating</option>
                                    <option value='max'>Mayor</option>
                                    <option value='min'>Menor</option>
                                </select>
                            </div>
                        </nav>
                        <Paginado videogamesForPage={VideogamesforPage}
                            allvideogames={allVideogames.length}
                            paginado={paginado}
                        />
                        <div className={HomeStyles.cards}>
                            {
                                currentVideogames?.map((el) => {
                                    return <Card key={el.id} name={el.name} image={el.image} genres={el.genres} id={el.id} />

                                })
                            }
                        </div>
                        <>
                            {allVideogames.length === 0 &&
                                <>
                                    <div className={HomeStyles.error}>No se encotró resultado</div>
                                    <img src={`${NotResults}`} alt='notsearch' />
                                </>
                            }
                        </>
                    </>
                    : Videogames.length === 0 ? <img className={HomeStyles.loading} src={`${Loading}`} alt='Loading...' />
                        :
                        <div>
                            <div className={HomeStyles.error} >No se pudo realizar la consulta</div>
                            <button className={HomeStyles.buttonhome} onClick={e => handleClick(e)}>HOME</button>
                            <img src={`${NotFound}`} alt='Not data not found'/>
                        </div>
            }
        </>
    )
}