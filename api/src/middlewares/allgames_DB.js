const { Videogame, Genre } = require('../db')
const reducedata = require('./reducedata')

const traertodoBd = async () => {
    const allrequestBd = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return reducedata(allrequestBd)
}

module.exports = {
    traertodoBd
}