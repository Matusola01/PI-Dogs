const { Router } = require ('express')
const router = Router()
const {Dog, Temperament} = require ('../db')

// router.post('/', async (req, res, next)=>{
//     const {name, minWeight, maxWeight, minHeight, maxHeight, image, minage, maxage, temperament} = req.body
//     // if(temperament.length === 0){
//     //     return res.sendStatus(500)}
// try {
//     const newBreed = await Dog.create({
//         image: image,
//         name: name,
//         height: `${minHeight} - ${maxHeight}` ,
//         weight: `${minWeight} - ${maxWeight}`,
//         age: `${minage} - ${maxage}`,
//     })
//     await newBreed.addTemperament(temperament);
//     res.json(newBreed)
// } catch (err) {
//         next(err)
//     }
// })

router.post('/', async (req, res, next) =>{

    let {img, name, minHeight, maxHeight, minWeight, maxWeight, minAge, maxAge, temperament} = req.body;

    if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !img){
        res.status(400).send('Necessary data missing')
    }
    else{
        try{
            const dog = await Dog.create({
                img: img,
                name: name,
                height: `${minHeight} - ${maxHeight}` ,
                weight: `${minWeight} - ${maxWeight}`,
                age: `${minAge} - ${maxAge}`,
            });
            
            if(temperament){
                temperament.forEach(async e => {
                    const temper = await Temperament.findOne({
                        where: {
                            name: e
                        }
                    })
                    await dog.addTemperaments(temper);
                });
            }
            res.send(dog);
        }
        catch(error){
            next(error)
        }
    }
});


module.exports = router;