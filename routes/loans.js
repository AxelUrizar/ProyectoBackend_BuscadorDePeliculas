var express = require('express');
var router = express.Router();
const Loan = require('../models/Loan');
const moment = require('moment')

const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    Loan.find({})
        .then(response => {
            if(response.length === 0) res.json({message: 'No hay préstamos.'})
            res.json(response)
        })
        .catch(err => res.json(err))
})

router.get('/userLoans', auth, (req, res) => {
    Loan.find({ userId: req.user._id })
        .then(response => res.json(response))
        .catch(err => res.json({ErrorMessage: err}))
})
    
router.post('/newLoan', auth, (req, res) => {
    Loan.create({
        movieTitle: req.body.movieTitle,
        description: req.body.description,
        userId: req.user.id
    })
      .then(response => res.json(response))
      .catch(err => res.json({ErrorMessage: err}))
})

router.put('/editLoan', (req, res) => {
    Loan.updateOne({ _id: req.body.id }, { returnAt: req.body.returnAt })
        .then(response => res.json(response))
        .catch(err => res.json({ErrorMessage: err}))
})

router.put('/returnLoan', (req, res) => {
    Loan.updateOne({_id: req.body.id}, {returnAt: moment(new Date()).format("DD/MM/YYYY"), returned: true})
        .catch(err => console.log(err))

    Loan.find({_id: req.body.id})
        .then(response => {
            const loan = response[0]
            res.json(loan)
        })
})

module.exports = router