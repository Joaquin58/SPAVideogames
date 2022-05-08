import React, { useState } from 'react'
import styles from './filtro.module.css'

const Filtexist = ({ handleFilterCreated }) => {
    const [valueSelect, setSelectValue] = useState('Filtra por existente o creado')
    return (
        <select className={styles.filters} value={valueSelect} onChange={e => { setSelectValue(e.target.value); handleFilterCreated(e) }}>
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