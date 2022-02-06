var express = require('express');
var router = express.Router();
var User = require('../models/User');

const auth = require('../middlewares/auth');

router.get('/newOrder', async (req, res) => {
    // let fecha = new Date.now()
    let date = new Date()
    let expireDate = new Date()
    let expireDateCalculated = expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))
    
    let user = await User.findOne({_id:req.query.id})

    if (!user) return res.send('Usuario no válido')
    if (user.activeLoan == true) return res.send('This user already has one movie loaned')

    user.makeOrder()

    res.json({
        rent_date: date.toLocaleDateString(),
        expire_date: expireDateCalculated
    })
    
})

module.exports = router;