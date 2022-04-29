
require('dotenv').config();
const { traertodo, traertodoBd } = require('../middlewares/allgames.js')
const reducedata = require('../middlewares/reducedata.js')
const { getByName, getByNameDb } = require('../middlewares/getByName')
const filter = require('../middlewares/filtros')
const orderbyname = require('../middlewares/ordenamiento')


const allgames = async (req, res) => {
    const { name, filtro, order } = req.query
    try {
        if (!name) {
            const allrequestApi = await traertodo()
            const allrequestBd = await traertodoBd()
            const allrequest = [...reducedata(allrequestBd), ...allrequestApi]
            filtro && order ? res.json(filter(filtro, orderbyname(order, allrequest)))
                : order ? res.json(orderbyname(order, allrequest))
                    : filtro ? res.json(filter(filtro, allrequest))
                        : res.status(200).json(allrequest)
        } else {
            const resultadosApi = await getByName(name)
            const nameBd = await getByNameDb(name)
            if (resultadosApi.length > 0 || nameBd.length > 0) {
                const results = 15 - nameBd.length
                const resto = [...reducedata(nameBd), ...reducedata(resultadosApi).slice(0, results)]
                order && filtro ? res.json(filter(filtro, orderbyname(order, resto))) :
                    order ? res.json(orderbyname(order, resto)) :
                        filtro ? res.json(filter(filtro, resto))
                            : res.status(200).json(resto)
            } else {
                return res.status(404).send('no encontrado')
            }
        }
    } catch (error) {
        res.status(500).json('error en allgames ' + error)
    }
}

module.exports = allgames