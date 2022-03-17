import React from 'react'
import { Link } from 'react-router-dom'
import fondo from '../images/Arcade2.jpg'
import landingstyles from './landing.module.css'
const Landing = () => {
    return (
        <div className={landingstyles.layout}>
            <img className={landingstyles.image} src={fondo} alt='backgroundimage' />
            <div className={landingstyles.block}>
                <h1 className={landingstyles.title}>
                    Bienvenidos
                </h1>
                <Link to='/home'>
                    <button className={landingstyles.button}>GET STARTED</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing
