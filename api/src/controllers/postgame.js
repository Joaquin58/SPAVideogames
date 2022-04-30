const postVideogame = require('../middlewares/postVideogame')
const postgame = async (req, res) => {
    const { genresid } = req.body
    try {
        const [newvideogame, created] = await postVideogame(req.body)

        /**
         * . recibe un array de id's de generos de la forma [1,2]
         * !asociar el juego a la tabla intermedia de plataformas
         */
        if (genresid.length > 0) {
            await newvideogame.addGenres(genresid)
            // !la s al final del addGenre(s) me permite agregar un arreglo de id's o un id en solitario
            // * de esta manera asosiamos los genros de manera eficiente sin bucles raros 
            return res.status(200).json({ created: created, newvideogame })
        } else {
            return res.status(200).json({ created: created, newvideogame })
        }
    } catch (err) {

        res.status(404).json(err)
    }
}

module.exports = postgame