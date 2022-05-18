import React /*,  { useState  }*/ from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    // getVideogameByName,
    saveName,
    // savePage
} from '../../redux/actions.js'
import styles from './search.module.css'

const SearchBar = ({ setCurrentPage, setFilters, filters }) => {
    const dispatch = useDispatch()
    const name = useSelector(state => state.savename)

    function handleSearch(e) {
        e.preventDefault()
        dispatch(saveName(e.target.value))
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }
    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     await dispatch(getVideogameByName(name))
    //     setCurrentPage(1)
    //     dispatch(savePage('1'))
    //     dispatch(saveName(''))
    // }
    return (
        // <form className={styles.form} onSubmit={searchbyfilters}>
        <div className={`${styles.search_box}`}>
            <input className={styles.search_input} type='text'
                placeholder="Seacrh Here..."
                value={name}
                onChange={e => handleSearch(e)}
                name='name'
            />
            <a href='#?search' className={styles.search_btn}>
                <i className={`${styles.fas} ${styles.fa_search}`}></i>
                {/* <img className={styles.fassrc} src={logo} alt="busqueda" /> */}
                
            </a>
            {/* <button className={styles.button} type="Submit">Buscar</button> */}
        </div>
        // </form>
    )
}

export default SearchBar