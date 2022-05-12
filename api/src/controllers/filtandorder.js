const { filterexist, filterbygenres, orderbyalfabet, filterexistbyname } = require('../middlewares/filterandorder.js')
const filtandorder = async (req, res) => {
    const { name, status, genres, alfabet } = req.body
    try {
        if (name.lenght > 0) {
            const existorcreate = await filterexist(status)
            const filtergenres = await filterbygenres(genres, existorcreate)
            const orderbyabc = await orderbyalfabet(alfabet, filtergenres)
            return res.status(200).json(orderbyabc)
        } else {
            const existorcreate = await filterexistbyname(status, name)
            if (!existorcreate.length > 0) return res.status(404).json('No Encotrado')
            const filtergenres = await filterbygenres(genres, existorcreate)
            const orderbyabc = await orderbyalfabet(alfabet, filtergenres)
            return res.status(200).json(orderbyabc)
        }
    } catch (error) {
        return res.status(500).json
    }
}

module.exports = filtandorder