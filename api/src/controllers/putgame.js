const { Videogame, Genre } = require('../db')
const updategame = require('../middlewares/putgame.js')
const putgame = async (req, res) => {
    const { id } = req.params
    try {
        let { genresid, ...params } = req.body

        await updategame(id, params, genresid)

        return res.status(200).json(await Videogame.findOne({
            where: { id }
        }))
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

module.exports = putgame