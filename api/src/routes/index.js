require('dotenv').config();
const { Router } = require('express');
const axios = require('axios')
const { Op } = require('Sequelize')
const { Videogame, Genre} = require('../db')
const { API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const ENDPAPI1 = 'https://api.rawg.io/api/games?key='
const ENDPAPI2 = 'https://api.rawg.io/api/games?search='
const ENDPAPI3 = 'https://api.rawg.io/api/genres'
const ENDPAPI4 = 'https://api.rawg.io/api/games/'
const ENDPAPI5 = 'https://api.rawg.io/api/platforms'


let allgames = [] //. declaramos el arreglo donde podremos almacenar los juegos que usaremos para que en primera instancia los carge
//. para que al final retornemos el mismo arreglo ya concatenado
//. Hace los requicitos necesarios para crear un arreglo de 100 juegos, devuelve un array de objetos de todos los juegos
//. mientras que tambien precargamos las plataformas que encuntre a la case de datos
async function traertodo() {
    if (allgames.length > 0) return allgames
    let page2, page3, page4, page5
    let { data } = await axios.get(`${ENDPAPI1}${API_KEY}`)
    let page1R = data.results //+ 20 juegos
    let page1D = reducedata(page1R)
    page2 = await axios.get(`${data.next}`)
    let page2R = page2.data.results//+ 20 juegos 
    let page2D = reducedata(page2R)
    page3 = await axios.get(`${page2.data.next}`)
    let page3R = page3.data.results //+ 20 juegos 
    let page3D = reducedata(page3R)
    page4 = await axios.get(`${page3.data.next}`)
    let page4R = page4.data.results //+ 20 juegos 
    let page4D = reducedata(page4R)
    page5 = await axios.get(`${page4.data.next}`)
    let page5R = page5.data.results //+ 20 juegos */
    let page5D = reducedata(page5R)
    allgames = [...page1D, ...page2D, ...page3D, ...page4D, ...page5D]
    return allgames // retorna el arreglo de todos los juegos con los valores que queremos
}

function reducedata(array) {
    return array.map(Obj => {
        return {
            id: Obj.id,
            image: Obj.background_image || Obj.image,
            name: Obj.name,
            genres: Obj.genres.map(g => g.name),
            rating: Obj.rating,
            CreatedInDb: Obj.CreatedInDb ? Obj.CreatedInDb : false
        }
    })
}

function reducebyid(Obj) {
    return {
        id: Obj.id,
        image: Obj.background_image,
        name: Obj.name,
        genres: Obj.genres.map(g => g.name),
        description: Obj.description,
        released: Obj.released,
        rating: Obj.rating,
        platforms: Obj.platforms.map(({platform})=> platform.name)
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
        return data.results.map(({id, name}) => {
            return {
                id,
                name
            }    
        })
    } catch (error) {
        return error
    }
}

router.get('/videogames', async (req, res) => {
    const { name } = req.query
    if (!name) {
        const allrequestApi = await traertodo()
        const allrequestBd = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
             
                through: {
                    attributes: []
                }
            }
        })
        const allrequest = [...reducedata(allrequestBd), ...allrequestApi]
        return res.json(allrequest)
    } else {
        try {
        const { data } = await axios.get(`${ENDPAPI2}${name}&key=${API_KEY}`)
        const resultadosApi = data.results
        const nameBd = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: { 
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        if (resultadosApi.length > 0 || nameBd.length > 0) {
            return res.send([...reducedata(nameBd), ...reducedata(resultadosApi).slice(0, 15)])
        } else {
            return res.send('no encontrado')
        }
        } catch (error) {
            res.send(error)
        }
        
    }
})

router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params
    console.log(typeof id)
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
    const { name, description, released, rating, platforms, image, genresid} = req.body
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
            return res.status(200).json({ created })
        } else {
            return res.status(200).json({ created })
        }
    } catch (err) {
        console.log(err)
        res.status(404).send('algo salio mal')
    }
})

router.get('/platforms', async (req, res) => {
   res.json(await reducePlatfomr())
})

module.exports = router;
