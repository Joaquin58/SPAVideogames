const getgames = require('../middlewares/parallel')

async function parallel(req, res) {
    try {
        const all = await getgames()
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = parallel