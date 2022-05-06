const { Videogame } = require('../db')
const destroygame = async (id) => {
    await Videogame.destroy({ where: { id } })
}

module.exports = destroygame