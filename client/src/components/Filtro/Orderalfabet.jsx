import React from 'react'
import HomeStyles from '../home/home.module.css'

const Orderalfabet = ({ handleOrderAlfabet, value }) => {
    return (
        <select className={HomeStyles.select} value={value} onChange={handleOrderAlfabet} name='alfabet'>
            <optgroup label="Orden alfabetico">
                <option value='Orden alfabetico' disabled hidden>Orden alfabetico</option>
                <option value='asd'>🔼 A➡Z</option>
                <option value='des'>🔽 Z➡A</option>
            </optgroup>
        </select>
    )
}

export default Orderalfabet