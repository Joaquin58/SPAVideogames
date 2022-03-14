require('dotenv').config();
const { Router } = require('express');
const axios = require ('axios') 
const {API_KEY}=process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/test1', async (req,res)=>{     
    const {data} = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    // !primeros 20 juegos
    console.log(data)
    //* data.next = `https://api.rawg.io/api/games?search=tom-clacy's-rainbow-six-siege&key=${API_KEY}&page=2` siguientes 20 juegos
    res.json(data.results)
    
})
router.get('/test2', async (req,res)=>{    
  console.log(req.query)

  const {name} = req.query
  // const name2 = 'tom-clacys-rainbow-six-siege'
  const name2 = 'mamador'
const {data} = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name2}`)
 // !array de objetos con coincidencias de nombres    
 
 let results = data.results.slice(0,15)
 if(results.length!==0){
   return res.json(results)

 }
  return res.status(404).json({msg: 'no encontrado'})


})
router.get('/test3', async (req,res)=>{     
    const {data} = await axios.get(` https://api.rawg.io/api/genres?key=${API_KEY}`)
   {
    /*
    !arreglo de objetos con las propiedades
    **   "id": 4,
    "name": "Action",
    "slug": "action",
    "games_count": 142257,
    "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg",
    "games": [
      {
        "id": 3498,
        "slug": "grand-theft-auto-v",
        "name": "Grand Theft Auto V",
        "added": 16866
      },
      {
        "id": 3328,
        "slug": "the-witcher-3-wild-hunt",
        "name": "The Witcher 3: Wild Hunt",
        "added": 15484
      },
      {
        "id": 5286,
        "slug": "tomb-raider",
        "name": "Tomb Raider (2013)",
        "added": 13207
      },
      {
        "id": 5679,
        "slug": "the-elder-scrolls-v-skyrim",
        "name": "The Elder Scrolls V: Skyrim",
        "added": 12839
      },
      {
        "id": 4291,
        "slug": "counter-strike-global-offensive",
        "name": "Counter-Strike: Global Offensive",
        "added": 12576
      },
      {
        "id": 12020,
        "slug": "left-4-dead-2",
        "name": "Left 4 Dead 2",
        "added": 12543
      }
    ]
    */
   }
    console.log(data)
    res.json(data.results)
})
router.get('/test4', async (req,res)=>{     
    const id = 2
    const {data} = await axios.get(` https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    console.log(data)
    res.json(data)
})

module.exports = router;
