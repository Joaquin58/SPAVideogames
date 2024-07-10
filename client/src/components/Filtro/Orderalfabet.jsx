import React from 'react'
import HomeStyles from '../home/home.module.css'

const Orderalfabet = ({ handleOrderAlfabet, value }) => {
    return (
        <select className={HomeStyles.select} value={value} onChange={handleOrderAlfabet} name='alfabet'>
            <optgroup label="Orden alfabetico">
                <option value='Orden alfabetico' disabled hidden>Orden alfabetico</option>
                <option value='asd'><span role='img' aria-label="up-arrow">🔼</span> A➡Z</option>
                <option value='des'> <span role='img' aria-label="down-arrow" >🔽</span> Z➡A</option>
            </optgroup>
        </select>
    )
}

export default Orderalfabet