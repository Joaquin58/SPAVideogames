require('dotenv').config();
const { Router } = require('express');

const { Videogame, Genre } = require('../db')
const allgames = require('../controllers/getAllvideogames.js')
const getById = require('../controllers/getById.js')
const chargegenres = require('../controllers/chargegenres.js');
const postgame = require('../controllers/postgame');
const platforms = require('../controllers/platforms.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', allgames)

router.get('/videogames/:id', getById)

router.get('/genres', chargegenres)

router.post('/videogame', postgame)

router.get('/platforms', platforms)

router.put('/update/:id', async (req, res) => {
    const { id } = req.params
    try {
        let {genresid, ...params} = req.body
        
        await Videogame.update(params, {
            where: {id}
        })

        const updateVideogame = await Videogame.findOne({
            where: {id}
        })

        await updateVideogame.setGenres(genresid)

        res.status(200).json(await Videogame.findOne({
            where: {id}
        }))

    } catch (error) {
        res.status(404).json(error)
    }

})
module.exports = router;
