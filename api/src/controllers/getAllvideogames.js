
require('dotenv').config();
const { traertodo, traertodoBd } = require('../middlewares/allgames.js')
const { getByName, getByNameDb } = require('../middlewares/getByName');
const parallel = require('../middlewares/parallel.js');

const allgames = async (req, res) => {
    const { name } = req.query
    try {
        if (!name) {
            const allrequestApi = await parallel()
            const allrequestBd = await traertodoBd()
            const allrequest = [...allrequestBd, ...allrequestApi]
            console.log(allrequest.length)
            return res.status(200).json(allrequest)
        } else {
            const resultadosApi = await getByName(name)
            const nameBd = await getByNameDb(name)
            if (!resultadosApi.length > 0 || !nameBd.length > 0) return res.status(404).send('no encontrado')
            const results = 15 - nameBd.length
            const resto = [...nameBd, ...resultadosApi.slice(0, results)]
            return res.status(200).json(resto)
        }
    } catch (error) {
        res.status(500).json('error en allgames ' + error)
    }
}

module.exports = allgames