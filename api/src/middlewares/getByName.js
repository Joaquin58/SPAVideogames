const axios = require('axios')
const { Op } = require('Sequelize')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env
const ENDPAPI2 = 'https://api.rawg.io/api/games?search='

const getByName = async (name) => {
    const { data: { results } } = await axios.get(`${ENDPAPI2}${name}&key=${API_KEY}`)
    return results
}
const getByNameDb = async (name) => {
    const nameBd = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return nameBd
}


module.exports = {
    getByName,
    getByNameDb
}