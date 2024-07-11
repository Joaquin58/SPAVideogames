const axios = require('axios')
const ENDPAPI5 = 'https://api.rawg.io/api/platforms'
const { API_KEY } = process.env
async function reducePlatfomr() {

    const { data: { next, results } } = await axios.get(`${ENDPAPI5}?key=${API_KEY}`)
    
    const { data: { results: platform } } = await axios.get(`${next}`)

    const page1 = results.map(({ id, name }) => {
        return {
            id,
            name
        }
    })

    const page2 = platform.map(({ id, name }) => {
        return {
            id,
            name
        }
    })
    return [...page1, ...page2]
}

module.exports = reducePlatfomr