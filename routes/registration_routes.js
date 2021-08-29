const express = require('express');
const registration = require('../models/registration_models');
const router = express.Router();
const{check, validationResult} = require('express-validator') // for validation our user data
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.post('/registration/insert',[
    check('username', 'username is required!!').not().isEmpty(),
    check('email', 'Email is required!!').isEmail(),
    check('password', 'password is required!!').not().isEmpty()
], function(req,res){
    const validationErr = validationResult(req);
   // res.send(validationErr.array());
    console.log(req.body);

    if(validationErr.isEmpty())
    {
    const username = req.body.username;
    const fullname = req.body.fullname;
    const address = req.body.address;
    const email = req.body.email;
   const phone_number = req.body.phone_number;
    const password = req.body.password;
    const userType = req.body.userType;
    bcryptjs.hash(password, 10, function(error,pw_hash){
        const data = new registration({
            username: username, 
            fullname: fullname,
            address: address, 
            phone_number: phone_number, 
            email: email, 
            password: pw_hash,
            userType: userType
         });
        data.save()
        .then(function(result){
            res.status(201).json({success:true,message : "Registered"})
        })
        .catch(function(error1){
            res.status(500).json({ message : error1})

        })
    })
     

         
    }
    else{
        //invalid
        res.status(400).json({errors : validationErr.array()}); 
    }

})
//username/password receive
// is username available in the database 
// if not then send err messageif true again check password
// if false then send error messageif true login
router.post('/registration/login', function(req,res){
   // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
 
    registration.findOne({email : email})
    .then(function(touristData){
       // console.log(touristData);
        if(touristData===null){
            //no user found
            return res.status(403).json({message : "invalid login detail1"})
        }
        //user found
        bcryptjs.compare(password, touristData.password, function(err, result1){
            if(result1===false){
                return res.status(403).json({message : "invalid login detail2"})

            }
           const token = jwt.sign({TouristId : touristData._id},'aadityachhetri')
        res.status(200).json({success:true , token : token, message: "login successully!!", touristData: touristData.touristData
    
    })
    console.log(token)


        
        })
        

    })
    .catch(function(e){
        res.status(500).json({error : e.message});
    })

})
// router.post('/user/insert', function(req,res){
//     const username = req.body.username;
//     const first_name = req.body.first_name;
//     const last_name = req.body.last_name;
//     const address = req.body.address;
//     const phone_number = req.body.phone_number;
//     const password = req.body.password

// })
 


module.exports = router;