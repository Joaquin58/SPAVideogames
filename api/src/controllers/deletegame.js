const destroygame = require('../middlewares/destroygame.js')
const deletegame = async (req, res) => {
    const { id } = req.params
    try {
        await destroygame(id)
        res.status(200).json('delete succes')
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = deletegame