const axios = require('axios')
const { API_KEY } = process.env
const reducedata = require('./reducedata')
const ENDPAPI1 = 'https://api.rawg.io/api/games?key='

let pagesnums = [1, 2, 3, 4, 5]

async function getGamepage(numpage) {
    const { data: { results } } = await axios.get(`${ENDPAPI1}${API_KEY}&page=${numpage}`)
    return reducedata(results)

}
const parallel = async () => {
    const allgames = await Promise.all(pagesnums.map(async (num) => getGamepage(num)))
    return allgames
}

module.exports = parallel