const { Videogame } = require('../db')
const postgame = async (body) => {
    const { name, description, released, rating, platforms, image } = body
    const game = await Videogame.findOrCreate({
        where: {
            name,
            description,
            released,
            rating,
            image,
            platforms
        }
    });
    return game
}

module.exports = postgame