const mongoose = require('mongoose');

const registration = mongoose.model('registration',{
    username: {
        type : String,
        required : true,
        unique : true
    },
    fullname : {
        type: String
    },
     
    address : {
        type: String
    },
    phone_number : {
        type:   String
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    userType:{
        type:String,
        enum :['Admin','Tourist','User'],
        default:'Tourist'
    }
     
})


module.exports = registration;