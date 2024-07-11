import React from 'react'
import { Link } from 'react-router-dom'
import fondo from '../images/Arcade2.jpg'
import landingstyles from './landing.module.css'
// import video from '../images/landingvideo.mp4'
const Landing = () => {
    return (
        <div className={landingstyles.layout}>
            <img className={landingstyles.image} src={fondo} alt='backgroundimage' />
            {/* <video className={landingstyles.myVideo} autoPlay muted loop id="myVideo" > */}
                {/* <source src= {`${video}`} type='video/mp4'/> */}
            {/* </video> */}
            <div className={landingstyles.block}>
                <h1 className={landingstyles.title}>
                    Welcom to This VideogamesApp
                </h1>
                <Link to='/home'>
                    <button className={landingstyles.button}>GET STARTED</button>
                </Link>
                <i className=''></i>
                <i className=''></i>
                <i className=''></i>
            </div>
        </div>
    )
}

export default Landing
