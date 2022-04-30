const reducePlatfomr = require('../middlewares/reduceplatforms.js')
const platforms = async (req, res) => {
    try {
        res.json(await reducePlatfomr())
    } catch (error) {
        res.json(err)
    }
}

module.exports = platforms