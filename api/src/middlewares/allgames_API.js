const axios = require('axios')
const { API_KEY } = process.env
const reducedata = require('./reducedata')
const ENDPAPI1 = 'https://api.rawg.io/api/games?key='

let pagesnums = [1, 2, 3, 4, 5]
let box = []
async function getGamepage(numpage) {
    const { data: { results } } = await axios.get(`${ENDPAPI1}${API_KEY}&page=${numpage}`)
    return reducedata(results)

}
const parallel = async () => {
    if (!(box.length === 0)) return box
    const arr = await Promise.all(pagesnums.map(async (num) => getGamepage(num)))
    // return  arr.reduce((x, y) => x.concat(y))
    let con = concat(arr)
    return con
}
/**
 * let arr1 = ["1","2", "3"]
 * let arr2 = ["4","5", "6"]
 * let arr3 = ["7","8","9"]
 * let parentarr = [arr1, arr2, arr3]
 * let newconcat = parentarr.reduce((x,y)=>{
    return x.concat(y)
    })
    newconcat
(9) ['1', '2', '3', '4', '5', '6', '7', '8', '9']
 */

function concat(array) {
    for (let e of array) {
        box = [...box, ...e]
    }
    return box
}
module.exports = parallel