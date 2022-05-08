const { Videogame } = require('../db')
const updategame = async (id, params, genresid) => {
    try {
        await Videogame.update(params, {
            where: { id }
        })

        const updateVideogame = await Videogame.findOne({
            where: { id }
        })

        await updateVideogame.setGenres(genresid)
    } catch (error) {
        return error
    }

}

module.exports = updategame