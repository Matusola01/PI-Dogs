const axios = require ('axios')
const {Dog, Temperament} = require ('../db')
require('dotenv').config()
const {API_KEY} = process.env

async function getDogApi(){
    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`)
    const array = dogsApi.data.map((e)=>{
        return {
            id: e.id,
            name: e.name,
            img: e.image.url,
            weight: e.weight.metric,
            height: e.height.metric,
            temperament: e.temperament,
            lifeSpan: e.life_span
        }
    })
    return array;
}

async function getDogDB(){
    let dogsDB = await Dog.findAll({
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['name'],
            through: {attributes: []}
            }
        ]
    });
    return dogsDB;
}

async function getAllDogs(){
    const apiDogs = await getDogApi()
    const DBdogs = await getDogDB()
    const allDogs = apiDogs.concat(DBdogs)
    return allDogs;
}


module.exports={
    getDogApi,
    getDogDB,
    getAllDogs
}