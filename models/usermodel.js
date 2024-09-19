
let mongoose = require('mongoose')

let userschema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    RSVPedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'evets' 
    }]
},{ timestamps: true })

let usermodel = mongoose.model('users', userschema)

module.exports = usermodel
