const {Router} = require('express');
const router = Router()
const axios = require('axios');
const {Dog, Temperament} = require ('../db');
require ('dotenv').config;
const {API_KEY} = process.env

router.get('/', async(req, res, next)=>{
    let check = await Temperament.findAll();
    if (check.length === 0) {
    let tempAPI = await axios
      .get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`)
      .catch((err) => {
        next(err);
      });
    let tempList = await tempAPI.data
      .map((n) => n.temperament)
      .join()
      .split(", ")
      .join()
      .split(",");
    const list = new Set(tempList);
    for (let item of list) {
      await Temperament.create({ name: item });
    }
  }
  var temp = await Temperament.findAll();
  res.json(temp);
});



    module.exports = router;