var express = require('express');
var router = express.Router();

// const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    let fecha = new Date.now()
    console.log(fecha)

    // res.send(fecha)
})

module.exports = router;