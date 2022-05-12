const axios = require('axios')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env
const reducedata = require('./reducedata')
const ENDPAPI1 = 'https://api.rawg.io/api/games?key='


let allgames = []

const traertodo = async () => {
    if (allgames.length > 0) return allgames
    let page2, page3, page4, page5
    let { data } = await axios.get(`${ENDPAPI1}${API_KEY}`)
    let page1R = data.results //+ 20 juegos
    let page1D = reducedata(page1R)
    page2 = await axios.get(`${data.next}`)
    let page2R = page2.data.results//+ 20 juegos |
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

const traertodoBd = async () => {
    const allrequestBd = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return reducedata(allrequestBd)
}

module.exports = {
    traertodo,
    traertodoBd
}