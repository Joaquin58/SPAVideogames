import React, { useRef } from "react"
import "./carpage.css"
function CardPage({ id, image, name, genres }) {
    const header = useRef('header')
    const title = useRef('title')
    const excerpt = useRef('excerpt')
    const profile_img = useRef('profile_img')
    const names = useRef('name')
    const date = useRef('date')
    const animated_bgs = useRef('.animated-bg')
    return (
        <div className="card">
            <div className="card-header animated-bg" id="header" ref={header}>{name ? name : "&nbsp;"}</div>
            <div className="card-content">
                <h3 className="card-title animated-bg animated-bg-text" id="title" ref={title}>
                    &nbsp;
                </h3>
                <p className="card-excerpt" id="excerpt" ref={excerpt}>
                    &nbsp;
                    <span className="animated-bg animated-bg-text" ref={animated_bgs}>&nbsp;</span>
                    <span className="animated-bg animated-bg-text" ref={animated_bgs}>&nbsp;</span>
                    <span className="animated-bg animated-bg-text" ref={animated_bgs}>&nbsp;</span>
                </p>
                <div className="author">
                    <div className="profile-img animated-bg" id="profile_img" ref={profile_img}>&nbsp;</div>
                    <div className="author-info">
                        <strong className="animated-bg animated-bg-text" id="name" ref={names}
                        >&nbsp;</strong
                        >
                        <small className="animated-bg animated-bg-text" id="date" ref={date}>&nbsp;</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPage