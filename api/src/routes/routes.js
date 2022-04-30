require('dotenv').config();
const { Router } = require('express');
const allgames = require('../controllers/getAllvideogames.js')
const getById = require('../controllers/getById.js')
const chargegenres = require('../controllers/chargegenres.js');
const postgame = require('../controllers/postgame');
const platforms = require('../controllers/platforms.js')
const putgame = require('../controllers/putgame.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// nota de cambio

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', allgames)

router.get('/videogames/:id', getById)

router.get('/genres', chargegenres)

router.post('/videogame', postgame)

router.get('/platforms', platforms)

router.put('/update/:id', putgame)

module.exports = router;