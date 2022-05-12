const axios = require('axios')
const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')
const reducedata = require('./reducedata')
const { API_KEY } = process.env
const ENDPAPI2 = 'https://api.rawg.io/api/games?search='

const getByName = async (name) => {
    const { data: { results } } = await axios.get(`${ENDPAPI2}${name}&key=${API_KEY}`)
    return reducedata(results).slice(0, 15)
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
    return reducedata(nameBd).slice(0, 15)
}


module.exports = {
    getByName,
    getByNameDb
}