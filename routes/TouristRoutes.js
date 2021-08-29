const express = require('express');
const tourist = require('../models/TouristModel')
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload')
var path = require('path');


router.post('/tourist/insert',function(req,res){
    
    // console.log(req.body);
    // console.log(req.file);   //this code is getting information of file type
    

//     if(req.file==undefined){
//             //this code is getting information of file type
 
//         return res.status(400).json({
             
//             message : "Upload jpeg or png format only!!!"
//         }) 
         
//    }

    const fullname = req.body.fullname;
    const address = req.body.address;
    const age = req.body.age;
    const gender = req.body.gender;
    const photo = req.body.photo;
    const data = new tourist({
        fullname:fullname,
        address:address,
        age:age,
        gender:gender,
       photo:photo
    });

    data.save()
    .then(function(result){
        res.status(201).json({ message:"tourist data Added Succesfully!!" })
    })
    .catch(function(e){
        res.status(500).json({err:e})
    })
})

//use put for update data
router.put('/tourist/update/:id',auth.verifyUser,function(req,res){
    const fullname = req.body.fullname;
    const address = req.body.address;
    const age = req.body.age;
    const gender = req.body.gender;
    const id = req.params.id;
   // const photo = req.body.photo;
   
     
    tourist.findOneAndUpdate({_id:id},{fullname:fullname,address:address,gender:gender,age:age},{new:true})
    .then(function(result){
        res.status(200).json({status:true,message:"Information updated successfully!!"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})
 

//use delete for delete data
router.delete('/tourist/delete/:id',auth.verifyUser, function(req,res){
    const id = req.params.id;
    tourist.deleteOne({_id:id})
    .then(function(result){
        
        if(result.deletedCount==0){
            return res.status(500).json({status:true,message:"Id not valid"})    
        }
        res.status(200).json({status:true,message:"Deleted succesfully"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

//use get for display all tourist data
router.get("/tourist/all" ,function(req,res){
    tourist.find()
    .then(function(data){
        res.status(200).json({data, success : true});
    })
    .catch(function(er){
        res.status(500).json({erroe:er.message, success : true})
    })
})

router.get("/tourist/single/:id",function(req,res){
    const id = req.params.id;
    tourist.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(er){
        res.status(500).json({erroe:er})
    })
})

module.exports=router;