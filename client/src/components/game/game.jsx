import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getVideogameById } from '../../redux/actions'
import imagedefault from '../images/createdefault.jpg'
import Loading from '../images/charge.gif'
import gamestyles from './game.module.css'

const Game = () => {

    let { vgid } = useParams();
    const dispatch = useDispatch()
    const idvideogame = useSelector(state => state.idvideogame)

    useEffect(() => {
        dispatch(getVideogameById(vgid))
        return () => {
            dispatch(getVideogameById())
        }
    }, [dispatch, vgid])

    if (idvideogame) {
        var { image, genres, description, name, platforms, rating, released, CreatedInDb } = idvideogame
        var defaultimage = image === null || image === undefined ? imagedefault : image.length===0 ? imagedefault : image
    }
    
    return (
        <>
            {!idvideogame ? <img src={`${Loading}`} alt='Loanding...' /> :
                <>
                    <h1 className={gamestyles.title}>{name}</h1>
                    {image === undefined ? <img src={`${Loading}`} alt='Loanding...' />
                        : <div className={gamestyles.contend}>
                            <div className={gamestyles.top}>
                                <img className={gamestyles.imagevg} src={`${defaultimage}`} alt='notfound' />
                                <div className={gamestyles.contentdates}>
                                    <div className={gamestyles.descriptionconteiner}><div className={gamestyles.description} dangerouslySetInnerHTML={{ __html: description }} /></div>
                                </div>
                            </div>
                            <div className={gamestyles.mapsconteiner}>
                                <div>
                                    <h5 className={gamestyles.subtitles}>Rating:</h5>
                                    <p className={gamestyles.rating}>{rating ? rating : 'notfound'}</p>
                                    <h5 className={gamestyles.subtitles}>Released:</h5>
                                    <p className={gamestyles.rating}>{released ? released: 'no disponible'}</p>
                                </div>
                                <div> <h5 className={gamestyles.subtitles}>Generos</h5> {
                                    genres === undefined ? <p>Loading...</p>
                                        : CreatedInDb ? genres.map(({name}) => {
                                            return <div className={gamestyles.rating} key={name}>{name}</div>
                                        })
                                            : genres.map(gen => {
                                                return <div className={gamestyles.rating} key={gen}>{gen}</div>
                                            })}
                                </div>
                                <div> <h5 className={gamestyles.subtitles}>Plataformas</h5> {
                                    platforms?.map(gen => {
                                        return <div className={gamestyles.rating} key={gen}>{gen}</div>
                                    })
                                }</div>
                            </div>
                            <Link to='/home'>
                                <button className={gamestyles.button}>Home</button>
                            </Link>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Game