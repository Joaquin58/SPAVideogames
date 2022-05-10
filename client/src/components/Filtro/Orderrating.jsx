import React from 'react'
import HomeStyles from '../home/home.module.css'

const Orderrating = ({ handleOrderRating, value }) => {

    return (
        <select className={HomeStyles.select} value={value} onChange={handleOrderRating}>
            <optgroup label="Ordena por rating">
                <option value='Ordena por rating' disabled hidden>Ordena por rating</option>
                <option value='max'>🔼Mayor</option>
                <option value='min'>🔽Menor</option>
            </optgroup>
        </select>
    )
}

export default Orderrating