/// the funtion of the guard

const jwt = require('jsonwebtoken');
//const tourist = require('../models/TouristModel')
const { findOne } = require('../models/TouristModel');
const registration = require('../models/registration_models')
 



//main guard
module.exports.verifyUser = function(req, res, next){
    try {
    const token = req.headers.authorization.split(" ")[1];

const data = jwt.verify(token, 'aadityachhetri');  
 
registration.findOne({_id:data.registrationID})
.then(function(result){
    req.userdetail = result; //all the details of the user
    next();
})
.catch(function(e){
    res.status(401).json({error:e})
})
}
catch(e){
res.status(401).json({error:e})
}

}


// second guard for admin------------------
module.exports.verifyadmin = function(req,res,next){
    if(!req.userdetail){
        return res.status(401).json({message:"Invalid User!"});   
       }
       else if(req.userdetail.userType!=='Admin'){
           return res.status(401).json({message:"Unauthorized!!"});
       }
       next();
}

module.exports.verifyTourist = function(req,res,next){
    if(!req.userInfo){
        return res.status(401).json({message:"Invalid User!"});   
       }
       else if(req.userInfo.userType!=='Tourist'){
           return res.status(401).json({message:"Unauthorized!!"});
       }
       next();
}
// module.exports.verifyAdmin = function(req,res,next){
//     if(!req.userInfo){
//         return res.status(401).json({message: "Invalid User"});

//     }
// else if(req.userInfo.userType!=='Admin'){
//     return req.status(401).json({message: "unauthorised"})

// }
// next();
// }

//third guard for User
module.exports.verifyUserd = function(req,res,next){
    if(!req.userInfo){
        return res.status(401).json({message: "Invalid User"});

    }
else if(req.userInfo.userType!=='User'){
    return req.status(401).json({message: "unauthorised"})

}
next();  
}
