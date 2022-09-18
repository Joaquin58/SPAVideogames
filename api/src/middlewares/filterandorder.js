const { traertodoBd } = require('./allgames_DB.js')
const { getByName, getByNameDb } = require('./getByName')
const filter = require('./filtros')
const orderbyname = require('./ordenamiento')
const parallel = require('./allgames_API.js')
const filterexist = async (status) => {

    return status === 'Exist'
        ? await parallel()
        : status === 'Created'
            ? await traertodoBd()
            : [...await traertodoBd(), ...await parallel()]
}

const filterbygenres = async (genre, existfilter) => {
    
    return filter(genre, existfilter)
}
const orderbyalfabet = (order, existfilter) => {
    return orderbyname(order, existfilter)
}
const filterexistbyname = async (status, name) => {
    // if (status === 'Exist') {
    //     return await getByName(name)
    // } else if (status === 'Created') {
    //     return await getByNameDb(name)
    // } else {
    //     const nameBd = await getByNameDb(name)
    //     const resultadosApi = await getByName(name)
    //     const results = 15 - nameBd.length
    //     return [...nameBd, ...resultadosApi.slice(0, results)]
        
    // }
    return status === 'Exist'
        ? await getByName(name)
        : status === 'Created'
        ? await getByNameDb(name)
        : [...await getByNameDb(name), ...await getByName(name)].slice(0, 15)
}
module.exports = {
    filterexist,
    filterbygenres,
    orderbyalfabet,
    filterexistbyname
}