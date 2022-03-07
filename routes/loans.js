var express = require('express');
var router = express.Router();
const Loan = require('../models/Loan');

const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    Loan.find({})
        .then(response => {
            if(response.length === 0) res.json({message: 'No hay préstamos.'})
            res.send(response)
        })
        .catch(err => res.json(err))
})

router.get('/userLoans', (req, res) => {
    Loan.find({ userId: req.body.userId })
        .then(response => res.json(response))
        .catch(err => res.json({ErrorMessage: err}))
})
    
router.post('/newLoan', (req, res) => {
    Loan.create({
        movieTitle: req.body.movieTitle,
        description: req.body.description,
        userId: req.body.userId
    })
      .then(response => res.json(response))
      .catch(err => res.json({ErrorMessage: err}))
})

router.put('/editLoan', (req, res) => {
    Loan.updateOne({ _id: req.body.id }, { returnAt: req.body.returnAt })
        .then(response => res.json(response))
        .catch(err => res.json({ErrorMessage: err}))
})

module.exports = router