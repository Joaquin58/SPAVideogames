import React from 'react'
import styles from './filtro.module.css'

const Filtexist = ({ handleFilterCreated, value }) => {

    return (
        <select className={styles.filters} value={value} onChange={handleFilterCreated}>
            <optgroup label="Filtra por existente o creado">
                <option value='All'>All</option>
                <option value='Filtra por existente o creado' disabled hidden>Filtra por existente o creado</option>
                <option value='Exist'>Exist</option>
                <option value='Created'>Created</option>
            </optgroup>
        </select>
    )
}

export default Filtexist