import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    postVideogame,
    getGenres,
    getPlatforms,
    updateGame
} from '../../redux-toolkit/actions'
import addvgstyles from './addvg.module.css'
const validateerrors = (input) => {
    let errors = {}
    if (!input.name) {
        errors.name = '*Se requiere el nombre'
    }
    if (!input.description) {
        errors.description = '*Se requiere una descripción'
    }
    if (input.rating > 5) {
        errors.rating = '*El valor debe ser inferior o igual a 5'
    }
    if (input.rating < 0) {
        errors.rating = '*El valor debe ser mayor o igual a 0'
    }
    if (input.platforms.length === 0) {
        errors.platforms = '*Introdusca las consolas compatibles'
    }
    return errors
}
export default function Anewvideogame() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getgenres = useSelector(({ genres }) => genres.genres)
    const Platfoms = useSelector(({ plataformas }) => plataformas.plataformas)

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        platforms: [],
        genres: [],
        genresid: [],
    })

    const [errors, serErrors] = useState({})

    let firstRender = useRef(0)
    let inputnombre = useRef()
    const inputReleased = useRef()
    const inputnumber = useRef()
    const inputimage = useRef()
    const inputdescription = useRef()

    const editgame = window.location.pathname === `/editgame/${id}`


    useEffect(() => {
        if (editgame) {
            if (firstRender.current === 0) {
                dispatch(getPlatforms())
                dispatch(getGenres())
                firstRender.current += 1
            }
            async function getData() {
                const { data: { name, description, released, rating, image, platforms, genres } } = await axios.get(`/videogames/${id}`)
                setInput({
                    name,
                    description,
                    released,
                    rating,
                    image,
                    platforms,
                    genres: genres.map(({ name }) => name),
                    genresid: genres.map(({ id }) => id)
                })
            }
            getData()
        } else {
            if (firstRender.current === 0) {
                dispatch(getPlatforms())
                dispatch(getGenres())
                firstRender.current += 1
            }
        }
    }, [dispatch, id, editgame])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        serErrors(validateerrors({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckpt = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.name]
            })
            serErrors(validateerrors({
                ...input,
                platforms: [...input.platforms, e.target.name]
            }))
        } else {
            setInput({
                ...input,
                platforms: input.platforms.filter(pt => pt !== e.target.name),
            })
            serErrors(validateerrors({
                ...input,
                platforms: input.platforms.filter(pt => pt !== e.target.name),
            }))
        }
    }

    const handleCheckgn = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                genresid: [...input.genresid, e.target.value],
                genres: [...input.genres, e.target.name]
            })
        } else {
            setInput({
                ...input,
                genres: input.genres.filter(pt => pt !== e.target.name),
                genresid: input.genresid.filter(id => parseInt(id) !== parseInt(e.target.value))
            })
        }
    }

    const hanldeSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0) {
            return alert('Ups faltó algo')
        } else if (editgame) {
            dispatch(updateGame(id, input))
            alert('Videojuego agregado')
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                image: '',
                platforms: [],
                genres: [],
                genresid: [],
            })
            serErrors({})
            // history.push(`/videogame/${id}`)
            navigate(`/videogame/${id}`,)
        } else {
            dispatch(postVideogame(input))
            alert('Videojuego agregado')
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                image: '',
                platforms: [],
                genres: [],
                genresid: [],
            })
            serErrors({})
            navigate('/home')
        }
    }
    const enterinput = (e, ref) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            ref?.current.focus()
        }
        return
    }

    return (
        <div className={addvgstyles.container}>

            <h1 className={addvgstyles.tytle}>Agrega tu videojuego</h1>
            <form className={addvgstyles.form} onSubmit={e => hanldeSubmit(e)}>
                <Link to='/home'>
                    <button className={addvgstyles.buttonhome}>Home</button>
                </Link>

                <div className={addvgstyles.labelcontend}>
                    <label className={addvgstyles.label}>Nombre</label>
                </div>
                <input type="text"
                    value={input.name}
                    name='name'
                    onChange={handleChange}
                    placeholder='Nombre del juego*'
                    className={addvgstyles.inputtext}
                    onKeyDown={e => enterinput(e, inputReleased)}
                    ref={inputnombre}
                    id='name'
                />
                {errors.name ? (<p className={addvgstyles.error}>{errors.name}</p>) : delete errors.name}

                <div className={addvgstyles.labelcontend}>
                    <label className={addvgstyles.label}>Released</label>
                </div>
                <input type="Date"
                    value={input.released}
                    name='released'
                    onChange={handleChange}
                    className={addvgstyles.inputtext}
                    id='relesed'
                    onKeyDown={e => enterinput(e, inputnumber)}
                    ref={inputReleased}
                />


                <div className={addvgstyles.labelcontend}>
                    <label className={addvgstyles.label}>Rating</label>
                </div>
                <input type="number"
                    value={input.rating}
                    name='rating'
                    onChange={handleChange}
                    min={0} max={5}
                    step="0.01"
                    placeholder='min: 0 - max: 5'
                    className={addvgstyles.inputtext}
                    id='raiting'
                    onKeyDown={e => enterinput(e, inputimage)}
                    ref={inputnumber}
                />
                {errors.rating ? (<p className={addvgstyles.error}>{errors.rating}</p>) : delete errors.rating}

                <div className={addvgstyles.labelcontend}>
                    <label className={addvgstyles.label}>Imagen url</label>
                </div>
                <input type="text"
                    value={input.image}
                    name='image'
                    onChange={handleChange}
                    className={addvgstyles.inputtext}
                    placeholder="https://example.com/videojuegos.jpg"
                    id='imageurl'
                    onKeyDown={e => enterinput(e, inputdescription)}
                    ref={inputimage}
                />
                <div className={addvgstyles.labelcontend}>
                    <label className={addvgstyles.label}>Description</label>
                </div>

                <textarea value={input.description}
                    name='description'
                    onChange={handleChange}
                    placeholder='Descripción del juego*'
                    className={addvgstyles.description}
                    id='description'
                    ref={inputdescription}
                />
                {errors.description ? (<p className={addvgstyles.error}>{errors.description}</p>) : delete errors.description}
                <fieldset className={addvgstyles.checked} onKeyDown={enterinput} id='platforms'>
                    <legend className={addvgstyles.legend}>Platfomrs</legend>
                    {Platfoms?.map((pt) => {
                        return <div className={addvgstyles.input} key={pt.id}>
                            <input type='checkbox'
                                className={addvgstyles.checkbox}
                                onChange={handleCheckpt}
                                key={pt.id}
                                name={pt.name}
                                value={pt.id}
                                checked={!!input.platforms?.find((name) => name === pt.name)}
                                id={pt.name}

                            /><label
                                className={addvgstyles.labelch} id={pt.name}
                            >{pt.name}</label>
                        </div>
                    })}
                    {errors.platforms ? (<p className={addvgstyles.error}>{errors.platforms}</p>) : delete errors.platforms}
                </fieldset>
                <fieldset className={addvgstyles.checked} onKeyDown={enterinput} id='genres'>
                    <legend className={addvgstyles.legend}>Genres</legend>
                    {getgenres?.map((gen) => {
                        return <div className={addvgstyles.input} key={gen.id}>
                            <input type='checkbox'
                                onChange={handleCheckgn}
                                key={gen.id}
                                name={gen.name}
                                value={gen.id}
                                id={gen.name}
                                className={addvgstyles.checkbox}
                                checked={!!input.genres?.find((name) => name === gen.name)}
                            /><label
                                className={addvgstyles.labelch} id={gen.name}
                            >{gen.name}</label>
                        </div>
                    })}
                </fieldset>
                <button className={addvgstyles.buttonsubmit} type="Submit">Submit</button>
            </form>
        </div>
    )
}
