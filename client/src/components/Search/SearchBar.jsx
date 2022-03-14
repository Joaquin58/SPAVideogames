import React,  { useState  } from 'react'
import { useDispatch } from 'react-redux'
import {
    getVideogameByName,
} from '../../redux/actions.js'
import styles from './search.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, saveName] = useState('')
    function handleSearch(e) {
        e.preventDefault()
        saveName(e.target.value)
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