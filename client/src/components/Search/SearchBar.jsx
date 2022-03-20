import React /*,  { useState  }*/ from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getVideogameByName,
    saveName,
    // Getvideogamesbynameparamam
} from '../../redux/actions.js'
import styles from './search.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const name = useSelector(state => state.savename)

    function handleSearch(e) {
        e.preventDefault()
        dispatch(saveName(e.target.value))
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getVideogameByName(name))
    }
    return (
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <input className={styles.SearchBar} type='text'
                placeholder="Navega por los juegos"
                value={name}
                onChange={e => handleSearch(e)}
            />
            <button className={styles.button} type="Submit">Buscar</button>
        </form>
    )
}

export default SearchBar