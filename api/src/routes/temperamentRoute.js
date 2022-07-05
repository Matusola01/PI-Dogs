const {Router} = require('express');
const router = Router()
const axios = require('axios');
const {Dog, Temperament} = require ('../db');
require ('dotenv').config;
const {API_KEY} = process.env

router.get('/', async(req, res, next)=>{
    try {
        let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let tempsRepeated = infoApi.data.map(el => el.temperament).toString();
    tempsRepeated = await tempsRepeated.split(',');
    const tempsConEspacio = await tempsRepeated.map(el => {
        if (el[0] == ' ') {
            return el.split('');
        }
        return el;
    });
    const tempsSinEspacio = await tempsConEspacio.map(el => {
        if (Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })

    await tempsSinEspacio.forEach(el => {
        if (el != '') {
            Temperament.findOrCreate({
                where: {
                    name: el
                },
            });
        }
    });
    const allTemps = await Temperament.findAll();
    res.status(200).send(allTemps);
    } catch (err) {
        next(err)   
    }
});


    // router.get('/', async(req, res, next)=>{
    //     try {
    //        let temperaments = await Temperament.findAll()
    //        if(!temperaments.length){
    //         let temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`)
    //         temperaments = await temperamentApi.data.map((r)=>({
    //             temperament: r.temperament
    //         }))
    //         await Temperament.bulkCreate(temperaments);
    //         temperaments = await Temperament.findAll()
    //        }
    //        res.json(temperaments); 
    //     } catch (err) {
    //         next(err)
    //     }
    // })

    module.exports = router;