const { Videogame, Genre } = require('../db')
const getGameById = async (id) => {
    let game = await Videogame.findByPk(id, {
        include: [{
            model: Genre,
            attributes: ['id', 'name'],
            through: {
                attributes: []
            }
        }]
    })
    return game
}

module.exports = getGameById