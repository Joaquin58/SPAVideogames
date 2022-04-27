require('dotenv').config();
const { Router } = require('express');
const axios = require('axios')
const { Videogame, Genre } = require('../db')
const allgames = require('../controllers/getAllvideogames.js')
const { API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const ENDPAPI3 = 'https://api.rawg.io/api/genres'
const ENDPAPI4 = 'https://api.rawg.io/api/games/'
const ENDPAPI5 = 'https://api.rawg.io/api/platforms'






function reducebyid(Obj) {
    return {
        id: Obj.id,
        image: Obj.background_image,
        name: Obj.name,
        genres: Obj.genres.map(g => g.name),
        description: Obj.description,
        released: Obj.released,
        rating: Obj.rating,
        platforms: Obj.platforms.map(({ platform }) => platform.name)
    }
}

async function prechargeGenres() {
    try {
        const { data } = await axios.get(`${ENDPAPI3}?key=${API_KEY}`)
        data.results.map(({ id, name }) => {
            Genre.findOrCreate({
                where: { id: id, name: name }
            })
        })
    } catch (err) {
        return err
    }
}

async function reducePlatfomr() {
    try {
        const { data } = await axios.get(`${ENDPAPI5}?key=${API_KEY}`)
        return data.results.map(({ id, name }) => {
            return {
                id,
                name
            }
        })
    } catch (error) {
        return error
    }
}




const update = async (videogame, genres) => {

}

router.get('/videogames', allgames)



router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params
    try {
        if (id.includes('-')) {
            let game = await Videogame.findByPk(id, {
                include: [{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })

            if (!game) return res.status(400).send('No encontrado')
            return res.status(200).json(game)
        }
        const { data } = await axios.get(`${ENDPAPI4}${id}?key=${API_KEY}`)
        return res.status(200).json(reducebyid(data))
    } catch (err) {
        res.send('No encontrado');
    }
})

router.get('/genres', async (req, res) => {
    try {
        const hayalgo = await Genre.findAll()
        if (hayalgo.length === 0) {
            await prechargeGenres()
            return res.json(await Genre.findAll())
        }
        return res.json(hayalgo)
    } catch (err) {
        return res.status(400).send(err.detail)
    }
})

router.post('/videogame', async (req, res) => {
    const { name, description, released, rating, platforms, image, genresid } = req.body
    try {
        const [newvideogame, created] = await Videogame.findOrCreate({
            where: {
                name,
                description,
                released,
                rating,
                image,
                platforms
            }
        });
        /**
         * . recibe un array de id's de generos de la forma [1,2]
         * !asociar el juego a la tabla intermedia de plataformas
         */
        if (genresid) {
            await newvideogame.addGenres(genresid)
            // !la s al final del addGenre(s) me permite agregar un arreglo de id's o un id en solitario
            // * de esta manera asosiamos los genros de manera eficiente sin bucles raros 
            return res.status(200).json({ created: created, newvideogame })
        } else {
            return res.status(200).json({ created: created, newvideogame })
        }
    } catch (err) {
        console.log(err)
        res.status(404).send('algo salio mal')
    }
})

router.get('/platforms', async (req, res) => {
    try {
        res.json(await reducePlatfomr())
    } catch (error) {
        res.json(err)
    }
})

router.put('/update/:id', async (req, res) => {
    const { id } = req.params
    try {
        let params = {}
        for (let value in req.body) {
            if (value !== 'genresid') {
                1
                params[value] = req.body[value]
            }
        }
        await Videogame.update(params, {
            where: id
        })

        const updateVideogame = await Videogame.findOne({
            where: id
        })

        await updateVideogame.setGenres(genresid)

        res.json({ msg: 'actualizado' })

    } catch (error) {
        res.status(404).json(error)
    }

})
module.exports = router;
