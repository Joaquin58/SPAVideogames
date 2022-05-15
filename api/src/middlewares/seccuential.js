const axios = require('axios')
const { API_KEY } = process.env
const reducedata = require('./reducedata')
const ENDPAPI1 = 'https://api.rawg.io/api/games?key='

let pagesnums = [1, 2, 3, 4, 5]
let allgames = []
async function getGamepage(numpage) {
    const { data: { results } } = await axios.get(`${ENDPAPI1}${API_KEY}&page=${numpage}`)
    return reducedata(results)

}

async function getallparallel() {
    if (allgames.length) return allgames
    await pagesnums.reduce(async (acc, num) => {
        await acc
        const results = await getGamepage(num)
        allgames = [...allgames, ...results]
    }, Promise.resolve())
    console.log('todos listos')

    return allgames
}
async function secforloop() {
    if (allgames.length) return allgames
    for (let nums of pagesnums) {
        const data = await getGamepage(nums)
        allgames = [...allgames, ...data]
        console.log(data)
    }
    console.log('all right')
    return allgames
}
module.exports = {
    getallparallel,
    secforloop
}