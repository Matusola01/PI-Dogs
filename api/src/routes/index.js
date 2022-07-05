const { Router } = require('express');
const dogRoute = require ('./dogRoute')
const dogsRoute = require ('./dogsRoute')
const temperamentRoute = require ('./temperamentRoute')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/Dogs', dogsRoute)
router.use('/Dog', dogRoute)
router.use('/Temperaments', temperamentRoute)

module.exports = router;
