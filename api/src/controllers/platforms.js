const reducePlatfomr = require('../middlewares/reduceplatforms.js')
const platforms = async (req, res) => {
    try {
        res.status(200).json(await reducePlatfomr())
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = platforms