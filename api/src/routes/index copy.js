require('dotenv').config();
const { Router, response } = require('express');
const axios = require('axios')
const { Op } = require('Sequelize')
const { Videogame, Genre, Plataforma } = require('../db')
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

let api = []
function requestall() {
    let response = axios.get(`${ENDPAPI1}${API_KEY}`)
        .then(({ data }) => {
            let reducer = reducedata(data.results)
            api = [...reducer]
            return axios.get(`${data.next}`)
        .then(({ data }) => {
            let reducer = reducedata(data.results)
            api = [...api, ...reducer]
            return axios.get(`${data.next}`)
        .then(({ data }) => {
            let reducer = reducedata(data.results)
            api = [...api, ...reducer]
            return axios.get(`${data.next}`)
        .then(({ data }) => {
            let reducer = reducedata(data.results)
            api = [...api, ...reducer]
            return axios.get(`${data.next}`)
        .then(({ data }) => {
            let reducer = reducedata(data.results)
            api = [...api, ...reducer]
            return api
                        })
                    })
                })
            })
        }).catch(err => err)
    return response
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
        platforms: Obj.platforms.map(({ platform }) => platform.name)
    }
}

function prechargeGenres() {
    const promise = axios.get(`${ENDPAPI3}?key=${API_KEY}`)
        .then(({ data }) => {
            data.results.map(({ id, name }) => {
                Genre.findOrCreate({
                    where: { id: id, name: name }
                })
            })
            return Genre.findAll()
        }).then(response => response)
        .catch(err => err)
    return promise
}

function reducePlatfomr() {
    const results = axios.get(`${ENDPAPI5}?key=${API_KEY}`)
        .then(({ data }) => {
            return data.results.map(({ id, name }) => {
                return {
                    id, name
                }
            })
        }).catch(err => err)
    return results
}

function orderbyname(orden, all){
    const nameorder = orden === 'asd' ? all.sort(function (a, b) {
        const onename = a.name.toLowerCase()
        const twoname = b.name.toLowerCase()
        if (onename > twoname) {
          return 1;
        }
        if (onename < twoname) {
          return -1;
        }

        return 0;
      }) : all.sort(function (a, b) {
        const onename = a.name.toLowerCase()
        const twoname = b.name.toLowerCase()
        if (onename < twoname) {
          return 1;
        }
        if (onename > twoname) {
          return -1;
        }
        return 0;
      })
      return nameorder
}

function filter(filt, all){
    const allVideogames = all
    const genresfilter = filt === 'ALL' ? allVideogames : allVideogames.filter(el => el.genres.includes(filt))
    return genresfilter
}

router.get('/videogames', (req, res) => {
    const { name, order, filtro } = req.query
    if (!name) {
        if (api.length > 0) {
            Videogame.findAll({
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
            .then(response => {
                let allrequest = [...reducedata(response), ...api]
                filtro && order ? res.json(filter(filtro, orderbyname(order, allrequest)))
                : order ? res.json(orderbyname(order, allrequest)) 
                : filtro ? res.json(filter(filtro, allrequest)) 
                : res.json(allrequest)
            }).catch(err => err)
        } else {
            requestall().then(results => {
                allrequest = [...results]
                Videogame.findAll({
                    include: {
                        model: Genre,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                })
                    .then(response => {
                        allrequest = [...reducedata(response), ...allrequest]
                        res.json(allrequest)
                    })
            }).catch(err => err)
        }
    }
    else {
        axios.get(`${ENDPAPI2}${name}&key=${API_KEY}`)
            .then(({ data }) => {
                const resultadosApi = data.results
                Videogame.findAll({
                    where: { name: { [Op.iLike]: `%${name}%` } },
                    include: {
                        model: Genre,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                }).then(results => {
                    const nameBd = results
                    if (resultadosApi.length > 0 || nameBd.length > 0) {
                        const results = 15 - nameBd.length
                        const resto = [...reducedata(nameBd), ...reducedata(resultadosApi).slice(0, results)]
                        order && filtro ? res.json(filter(filtro, orderbyname(order, resto ))):
                        order ? res.json(orderbyname(order, resto )) :
                        filtro ? res.json(filter( filtro, resto ))
                        : res.send(resto)
                    } else {
                        return res.status(404).send('no encontrado')
                    }
                })
            }).catch((error) => {
                res.status(404).json(error.code)
            })
    }
})

router.get('/videogames/:id', (req, res) => {
    const { id } = req.params
    if (id.includes('-')) {
        Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        }).then((result) => {
            return res.json(result)
        }).catch(err => {
            return res.status(404).json(err)
        })
    } else {
        axios.get(`${ENDPAPI4}${id}?key=${API_KEY}`)
            .then(({ data }) => {
                let response = reducebyid(data)
                return res.status(200).json(response)
            })
            .catch((err) => {
                return res.status(404).json(err);
            })
    }
})

router.get('/genres', (req, res) => {
    Genre.findAll()
        .then((response) => {
            if (response.length === 0) {
                prechargeGenres().then((response) => {
                    return res.json(response)
                })
            } else {
                return res.json(response)
            }
        }).catch(err => res.json(err))
})

router.post('/videogame', (req, res) => {
    const { name, description, released, rating, platforms, image, genresid } = req.body

    Videogame.findOrCreate({
        where: {
            name,
            description,
            released,
            rating,
            image,
            platforms
        }
    }).then(([newvideogame, created]) => {
        if (genresid) {
            newvideogame.addGenres(genresid)
            return res.status(200).json({ created: created, newvideogame })
        } else {
            return res.status(200).json({ created: created, newvideogame })
        }
    })
        .catch((err) => {
            console.log(err)
            res.status(404).send('algo salio mal')
        })
})

router.get('/platforms', (req, res) => {
    reducePlatfomr().then((response) => {
        return res.json(response)
    }).catch(err => {
        return res.status(400).send(err)
    })
})

module.exports = router;
