import React from 'react'
import styles from './filtro.module.css'

const Filtgenres = ({ allGenres, allinone, value }) => {
    
    return (
        <select className={styles.filters} value={value} onChange={allinone} name='genres'>
            <optgroup label="Filtra por generos">
                <option value='Filtra por generos' disabled hidden >Filtra por generos</option>
                <option value='ALL'>All</option>
                {
                    allGenres && allGenres.map((gen) => {
                        return <option key={gen.id} value={gen.name}>{gen.name}</option>
                    })
                }
            </optgroup>
        </select>
    )
}

export default Filtgenres