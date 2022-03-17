import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterVideogamesAndNameBk,
    filterVideogamesCreated
} from '../../redux/actions'
import styles from './filtro.module.css'
const FiltroGenre = () => {
    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)
    const name = useSelector(state => state.savename)
    function handleFilterGenres(e) {
        dispatch(filterVideogamesAndNameBk(name, '', e.target.value))
    }
    function handleFilterCreated(e) {
        dispatch(filterVideogamesCreated(e.target.value))
    }
    return (
        <>
            <select className={styles.filters} defaultValue='' onChange={e => handleFilterGenres(e)}>
                <option value='' disabled >Filtra por generos</option>
                <option value='ALL'>All</option>
                {
                    allGenres && allGenres.map((gen) => {
                        return <option key={gen.id} value={gen.name}>{gen.name}</option>
                    })
                }
            </select>
            <select className={styles.filters} defaultValue='' onChange={e => handleFilterCreated(e)}>
                <option value='' disabled >Filtra por existente o creado</option>
                <option value='All'>All</option>
                <option value='Exist'>Exist</option>
                <option value='Created'>Created</option>
            </select>
        </>

    )
}
export default FiltroGenre 