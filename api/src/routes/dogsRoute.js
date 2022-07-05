const { Router } = require ('express')
const router = Router()
const axios = require ('axios')
const {Dog, Temperament} = require ('../db')
require ('dotenv').config()
const {API_KEY} = process.env
// const {op} = require ('sequelize')
const {getAllDogs, getDogApi, getDogDB} = require ('../controllers/dogsController')


router.get('/', async(req, res, next)=>{
    const {name} = req.query
    try {
        let allDogs = await getAllDogs()
        if(name){
            let dogName = allDogs.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ? res.status(200).json(dogName) : res.status(500).json('No se encontraron resultados')
        }else{
            res.status(200).json(allDogs)
        }
    } catch (err) {
        next(err)
    }
})

router.get('/DogsApi', async (req,res) => {
    const result = await getDogApi();
    res.send(result)
})

router.get('/DogsDB', async (req,res) => {
    const result = await getDogDB();
    res.send(result)
})


function isUUID(id){
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
}


router.get('/:dogsId', async(req, res, next)=>{
    const {dogsId} = req.params;
    try {
        if(isUUID(dogsId)){
            let DogDB = await Dog.findOne({where: {id: dogsId} , include: [Temperament]})
            if(DogDB){
                return res.send({
                    id: DogDB.id,
                    img: DogDB.img,
                    name: DogDB.name,
                    temperament: DogDB.temperaments.map(e=> `${e.name}, `),
                    weight: DogDB.weight,
                    height: DogDB.height,
                    age: DogDB.age
                })}
            //   return res.status(200).send(DogDB)
        }else if(Number(dogsId)!== NaN) {
        let DogById = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
        DogById = DogById.data.find(e=>e.id === Number(dogsId));
        if(DogById){
            DogById = {
                id: DogById.id,
                name: DogById.name,
                img: DogById.image.url,
                weight: DogById.weight.metric,
                height: DogById.height.metric,
                temperament: DogById.temperament,
                age: DogById.life_span
        }
        }
        DogById ? res.status(200).send(DogById) : res.status(400).send('Id invalidate')
        }
        } catch (err) {
            next(err)   
        }

    });

module.exports = router;

// await Dog.findByPk(req.params.id,{
//     include: {
//             model: Temperament,
//             attributes: ["name"],
//             throug: {attributes: []}
//         }
//     })