const axios = require('axios')
const { API_KEY } = process.env
const reducedata = require('./reducedata')
const ENDPAPI1 = 'https://api.rawg.io/api/games?key='

let pagesnums = [1, 2, 3, 4, 5]
let box = []
async function getGamepage(numpage) {
    const { data: { results } } = await axios.get(`${ENDPAPI1}${API_KEY}&page=${numpage}`)
    return reducedata(results)

}
const parallel = async () => {
    if(!(box.length === 0)) return box
    const arr = await Promise.all(pagesnums.map(async (num) => getGamepage(num)))
    let con = concat(arr)
    return con
}

function concat(array) {
    for (let e of array) {
        box =[...box, ...e]
    }
    return box
}
module.exports = parallel