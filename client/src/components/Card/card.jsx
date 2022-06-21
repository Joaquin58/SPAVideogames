import React from "react";
import { Link } from 'react-router-dom'
import imagedefault from '../images/createdefault.jpg'
import cardstyles from './card.module.css'

const game = ({ id, image, name, genres }) => {
    var defaultimage =  image === null || image === undefined || image.length === 0 ? imagedefault : image
    return (
        <div className={cardstyles.caja}>
            <div className={cardstyles.box}>
                <Link to={`../videogame/${id}`} >
                    <h5 className={cardstyles.tytle}>{name}</h5>
                    <img className={cardstyles.image} src={`${defaultimage}`} alt='Not found' />
                    <div className={cardstyles.genres}>
                        {genres.map(g => {
                            return <div className={cardstyles.contend} key={g}><p>{g}</p></div>
                        })}
                    </div>
                </Link>
            </div>
        </div>
    )
}




export default game;