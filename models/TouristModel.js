const mongoose = require('mongoose');

const tourist = mongoose.model('tourist',{
    fullname:{
        type:String
    },
    address:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    
    photo:{
        type:String
    }
})
module.exports=tourist;