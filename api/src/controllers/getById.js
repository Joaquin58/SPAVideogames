const axios = require('axios')
const getGameById = require('../middlewares/getGameById')
const reducebyid = require('../middlewares/reducebyid')
const ENDPAPI4 = 'https://api.rawg.io/api/games/'
const { API_KEY } = process.env
const getById = async (req, res) => {
    const { id } = req.params
    try {
        if (id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
            let game = await getGameById(id)
            if (!game) return res.status(404).send('No encontrado')
            return res.status(200).json(game)
        } else {
            const { data } = await axios.get(`${ENDPAPI4}${id}?key=${API_KEY}`)
            return res.status(200).json(reducebyid(data))
        }
    } catch (err) {
        res.status(500).json('getByid ' + err);
    }
}

module.exports = getById