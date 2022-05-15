
const {getallparallel} = require('../middlewares/seccuential')


async function seccuential(req, res) {
    try {
        
        return res.status(200).json(await getallparallel())
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = seccuential