import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import imagedefault from '../images/createdefault.jpg'
import "./carpage.css"

function CardPage({ id, image, name, genres }) {
    const header = useRef('header')
    const title = useRef('title')
    const excerpt = useRef('excerpt')
    const profile_img = useRef('profile_img')
    const names = useRef('name')
    const date = useRef('date')
    const animated_bgs = useRef('.animated-bg')

    const loader = useSelector(({ videogames }) => videogames.loadinggames)
    //!controloar la animacion de carga con un loader
    var defaultimage = image === null || image === undefined || image.length === 0 ? imagedefault : image

    return (
        <Link to={`../videogame/${id}`}>
            <div className="card">
                <div className={loader ? "card-header animated-bg" : "card-header"} id="header" ref={header}>{defaultimage ? <img src={`${defaultimage}`} alt="" loading="lazy" /> : "&nbsp;"}</div>
                <div className="card-content">
                    <h3 className={loader ? "card-title animated-bg animated-bg-text" : "card-title"} id="title" ref={title}>
                        {name ? name : "nbsp;"}
                    </h3>
                    <p className="card-excerpt" id="excerpt" ref={excerpt}>
                        <>{genres?.map((g) => <span key={g}>{g} </span>) || "&nbsp;"}</>
                        <span className="animated-bg animated-bg-text" ref={animated_bgs}>&nbsp;</span>
                        <span className="animated-bg animated-bg-text" ref={animated_bgs}>&nbsp;</span>
                        <span className="animated-bg animated-bg-text" ref={animated_bgs}>&nbsp;</span>
                    </p>
                    <div className="author">
                        <div className="profile-img animated-bg" id="profile_img" ref={profile_img}>&nbsp;</div>
                        <div className="author-info">
                            <strong className="animated-bg animated-bg-text" id="name" ref={names}
                            >&nbsp;</strong>
                            <small className="animated-bg animated-bg-text" id="date" ref={date}>&nbsp;</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardPage