import React, { useState } from 'react'
import HomeStyles from '../home/home.module.css'

const Orderalfabet = ({ handleOrderAlfabet }) => {
    const [currentValue, setValue] = useState('Filtra por generos')
    return (
        <select className={HomeStyles.select} value={currentValue} onChange={e => { setValue(e.target.value); handleOrderAlfabet(e) }}>
            <optgroup label="Ordena por orden alfabetico">
                <option value='Ordena por orden alfabetico' disabled hidden>Ordena por orden alfabetico</option>
                <option value='asd'>Ascendente</option>
                <option value='des'>Descendente</option>
            </optgroup>
        </select>
    )
}

export default Orderalfabet