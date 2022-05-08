const { Videogame } = require('../db')
const updategame = async (id, params, genresid) => {
    await Videogame.update(params, {
        where: { id }
    })

    const updateVideogame = await Videogame.findOne({
        where: { id }
    })

    await updateVideogame.setGenres(genresid)
}

module.exports = updategame