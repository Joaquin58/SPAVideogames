import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {
    getVideogames,
    getGenres,
    orderchange,
    saveName,
    savePage,
    filterandorder,
} from '../../redux-toolkit/actions.js'
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

    const allVideogames = useSelector(({ videogames }) => videogames.videogames)
    const Videogames = useSelector(({ videogames }) => videogames.allVideogames)
    const allGenres = useSelector(({ genres }) => genres.genres)
    //*--- Estados Locales ---*
    const [CuerrentPage, setCurrentPage] = useState(1)
    const [VideogamesforPage] = useState(15)
    const [filters, setFilters] = useState({
        name: '',
        status: "Filtra por existente o creado",
        genres: "Filtra por generos",
        alfabet: 'Orden alfabetico',
        rating: "Ordena por rating",
    })

    //* --- Paginado ---*
    if (Array.isArray(allVideogames)) {
        var indexOfLastVideogame = CuerrentPage * VideogamesforPage     //todo: calcula el numero del ultimo juego
        var idexOfFirstPage = indexOfLastVideogame - VideogamesforPage  //todo: calcula el numero del primer juego
        var currentVideogames = allVideogames.slice(idexOfFirstPage, indexOfLastVideogame)

    }

    const paginado = (pageNumber) => setCurrentPage(pageNumber)


    //!vaciar el estado de todos los videojuegos al salir del componente
    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
        dispatch(saveName(''))
        dispatch(savePage(''))
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        setFilters({
            status: "Filtra por existente o creado",
            genres: "Filtra por generos",
            alfabet: 'Orden alfabetico',
            rating: "Ordena por rating",
            name: ''
        })
        dispatch(orderchange())
        dispatch(getVideogames())
        setCurrentPage(1)
        dispatch(savePage('1'))
    }

    function handleReset(e) {
        e.preventDefault()
        setFilters({
            name: '',
            status: "Filtra por existente o creado",
            genres: "Filtra por generos",
            alfabet: 'Orden alfabetico',
            rating: "Ordena por rating",
        })
    }

    function searchbyfilters(e) {
        e.preventDefault()
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    async function handelorders(e) {
        e.preventDefault()
        if (e.target.name === 'alfabet') {
            setFilters({ ...filters, [e.target.name]: e.target.value, rating: "Ordena por rating" })
        } else if (e.target.name === 'rating') {
            setFilters({
                ...filters, [e.target.name]: e.target.value, alfabet: 'Orden alfabetico',
            })
        }
    }

    function submitfilters(e) {
        e.preventDefault()
        dispatch(filterandorder(filters));
        setCurrentPage(1);
        dispatch(savePage('1'));
        dispatch(saveName(''))
    }
    return (
        <>
            {
                Array.isArray(allVideogames) && Videogames.length > 0 ?
                    <>
                        <nav className={HomeStyles.nav}>
                            <Link to={'../makevideogame'}>
                                <button className={HomeStyles.buttonadd}>Agregar Videogame</button>
                            </Link>
                            <h1>Videogames</h1>
                            <button className={HomeStyles.button} onClick={e => handleClick(e)}>Recargar Juegos</button>
                            <form onSubmit={submitfilters} className={HomeStyles.form}>
                                <SearchBar setCurrentPage={setCurrentPage} searchbyfilters={searchbyfilters} setFilters={setFilters} filters={filters} submitfilters={submitfilters} />

                                <div className={HomeStyles.selecters}>
                                    <Filtexist handleFilterCreated={searchbyfilters} value={filters.status} />
                                    <Filtgenres allGenres={allGenres} allinone={searchbyfilters} value={filters.genres} />
                                    <Orderalfabet handleOrderAlfabet={handelorders} value={filters.alfabet} />
                                    <Orderrating handleOrderRating={handelorders} value={filters.rating} />
                                    <button type="Submit" className={HomeStyles.buttonfilter}>filtrar</button>
                                </div>
                            </form>
                            <button onClick={handleReset} className={HomeStyles.buttonreset}>Reset</button>
                        </nav>
                        <Paginado
                            videogamesForPage={VideogamesforPage}
                            allvideogames={allVideogames.length}
                            paginado={paginado}
                            currentPage={CuerrentPage}
                        />
                        <div className={HomeStyles.cards}>
                            {
                                currentVideogames?.map((el) => <Card key={el.id} name={el.name} image={el.image} genres={el.genres} id={el.id} />)
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