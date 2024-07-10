import React from 'react'
import HomeStyles from '../home/home.module.css'

const Orderrating = ({ handleOrderRating, value }) => {

    return (
        <select className={HomeStyles.select} value={value} onChange={handleOrderRating} name='rating'>
            <optgroup label="Ordena por rating">
                <option value='Ordena por rating' disabled hidden>Ordena por rating</option>
                <option value='max'><span role='img' aria-label="up-arrow">🔼</span>Mayor</option>
                <option value='min'><span role='img' aria-label="down-arrow">🔽</span>Menor</option>
            </optgroup>
        </select>
    )
}

export default Orderrating