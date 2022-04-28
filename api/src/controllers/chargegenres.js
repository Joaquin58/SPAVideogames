const { Genre } = require('../db')
const prechargeGenres = require('../middlewares/prechargegenres.js')
const chargegenres = async (req, res) => {
    try {
        const hayalgo = await Genre.findAll()
        if (hayalgo.length === 0) {
            await prechargeGenres()
            return res.status(200).json(await Genre.findAll())
        }
        return res.status(200).json(hayalgo)
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = chargegenres