const axios = require('axios')
const ENDPAPI5 = 'https://api.rawg.io/api/platforms'
const { API_KEY } = process.env
async function reducePlatfomr() {
    try {
        const { data: { results } } = await axios.get(`${ENDPAPI5}?key=${API_KEY}`)
        return results.map(({ id, name }) => {
            return {
                id,
                name
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = reducePlatfomr