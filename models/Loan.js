const moment = require('moment')
const mongoose = require('mongoose')
const LoanSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    rentedAt: {
        type: String,
        required: true,
        default: moment(new Date()).format("DD/MM/YYYY")
    },
    returnAt: {
        type: String, 
        required: true,
        default: moment(new Date()).add(4, 'days').format('DD/MM/YYYY')
    },
    returned: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model ('Loan', LoanSchema)