var express = require('express');
var router = express.Router();

// const auth = require('../middlewares/auth');

router.get('/newOrder', (req, res) => {
    // let fecha = new Date.now()
    console.log('hola')
    let date = new Date()
    let expireDate = new Date()
    res.json({
        rent_date: date.toLocaleDateString(),
        expire_date: expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))

    })
})

module.exports = router;