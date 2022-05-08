import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {
    getVideogames,
    getGenres,
    orderVideogamesByRaiting,
    filterVideogamesCreated,
    filterVideogamesAndNameBk,
    orderchange,
    saveName,
    savePage
} from '../../redux/actions.js'
import SearchBar from "../Search/SearchBar.jsx";
import Card from '../Card/card.jsx'
import Paginado from '../Paginado/Paginado.jsx'
import Loading from '../images/charge.gif'
import NotFound from '../images/gameovertransparent.png'
import NotResults from '../images/not-found-icon-15.jpg'
import HomeStyles from '../home/home.module.css'
import Filtexist from "../Filtro/Filtexist.jsx";
import Filtgenres from "../Filtro/Filtgenres.jsx";
import Orderalfabet from "../Filtro/Orderalfabet.jsx";
import Orderrating from "../Filtro/Orderrating.jsx";
export default function Home() {

    const dispatch = useDispatch()

    const allVideogames = useSelector((state) => state.videogames)
    const Videogames = useSelector((state) => state.allVideogames)
    const name = useSelector(state => state.savename)
    const allGenres = useSelector(state => state.genres)
    const order = useSelector(state => state.ordertype)
    //*--- Estados Locales ---*
    const [CuerrentPage, setCurrentPage] = useState(1)
    const [VideogamesforPage] = useState(15)

    const [, setOrden] = useState('')

    //* --- Paginado ---*
    if (Array.isArray(allVideogames)) {
        var indexOfLastVideogame = CuerrentPage * VideogamesforPage     //todo: calcula el numero del ultimo juego
        var idexOfFirstPage = indexOfLastVideogame - VideogamesforPage  //todo: calcula el numero del primer juego
        var currentVideogames = allVideogames.slice(idexOfFirstPage, indexOfLastVideogame)

    }

    const paginado = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
        dispatch(saveName(''))
        dispatch(savePage(''))
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(orderchange())
        dispatch(getVideogames())
    }

    function handleOrderAlfabet(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(orderchange(e.target.value))
        dispatch(filterVideogamesAndNameBk(name, e.target.value))
    }

    function handleOrderRating(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(orderVideogamesByRaiting(e.target.value))
        //modifica el estado local para que se renderize por un cambio
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        setCurrentPage(1)
        dispatch(filterVideogamesCreated(e.target.value))
    }

    function allinone(e) {
        setCurrentPage(1)
        dispatch(filterVideogamesAndNameBk(name, order, e.target.value))
        dispatch(savePage(''))
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
                            <button className={HomeStyles.button} onClick={e => handleClick(e)}>Recargar Juegos</button>
                            <SearchBar setCurrentPage={setCurrentPage} />
                            <div className={HomeStyles.selecters}>
                                <Filtexist handleFilterCreated={handleFilterCreated} />
                                <Filtgenres allGenres={allGenres} allinone={allinone} />
                                <Orderalfabet handleOrderAlfabet={handleOrderAlfabet} />
                                <Orderrating handleOrderRating={handleOrderRating} />
                            </div>
                        </nav>
                        <Paginado
                            videogamesForPage={VideogamesforPage}
                            allvideogames={allVideogames.length}
                            paginado={paginado}
                            currentPage={CuerrentPage}
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
                            <img src={`${NotFound}`} alt='Not data not found' />
                        </div>
            }
        </>
    )
}