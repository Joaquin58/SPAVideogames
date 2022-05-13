const { filterexist, filterbygenres, orderbyalfabet, filterexistbyname } = require('../middlewares/filterandorder.js')
const filtandorder = async (req, res) => {
    const { name, status, genres } = req.body
    try {
        if (!name.length > 0) {
            const existorcreate = await filterexist(status)
            if ((genres === "Filtra por generos")) return res.status(200).json(existorcreate);
            const filtergenres = genres === "Filtra por generos" || genres === "ALL"
                ? existorcreate
                : await filterbygenres(genres, existorcreate)
            return res.status(200).json(filtergenres)
        } else {
            const existorcreate = await filterexistbyname(status, name)
            if (!existorcreate.length > 0) return res.status(404).json('No Encotrado')
            // if (genres === "Filtra por generos") return res.status(200).json(existorcreate);
            const filtergenres = genres === "Filtra por generos" || genres === "ALL"
                ? existorcreate
                : await filterbygenres(genres, existorcreate)
            return res.status(200).json(filtergenres)
        }
    } catch (error) {
        return res.status(500).json
    }
}

module.exports = filtandorder