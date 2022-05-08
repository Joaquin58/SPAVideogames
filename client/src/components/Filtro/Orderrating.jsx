import React, { useState } from 'react'
import HomeStyles from '../home/home.module.css'

const Orderrating = ({ handleOrderRating }) => {
    const [currentValue, setValue] = useState('Ordena por rating')
    return (
        <select className={HomeStyles.select} value={currentValue} onChange={e => { setValue(e.target.value); handleOrderRating(e) }}>
            <optgroup label="Ordena por rating">
                <option value='Ordena por rating' disabled hidden>Ordena por rating</option>
                <option value='max'>🔼Mayor</option>
                <option value='min'>🔽Menor</option>
            </optgroup>
        </select>
    )
}

export default Orderrating