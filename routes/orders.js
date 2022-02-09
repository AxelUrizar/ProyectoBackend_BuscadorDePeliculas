var express = require('express');
var router = express.Router();
var User = require('../models/User');

var funciones = require('../funciones')

// const auth = require('../middlewares/auth');

router.post('/newOrder', async (req, res) => {
    // let fecha = new Date.now()    
    let user = await User.findOne({_id:req.query.id})

    let date = new Date()
    let expireDate = new Date()
    let expireDateCalculated = expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))

    if (!user) return res.send('Usuario no válido')
    if (user.activeLoan == true) return res.send('This user already has one movie loaned')

    user.makeOrder()

    res.json({
        rent_date: date.toLocaleDateString(),
        rent_time: '7 days',
        expire_date: expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))
    })
    
})

module.exports = router;