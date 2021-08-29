var express = require('express')
const multer = require('multer');


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './public/files')
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})

//now we are going to filter file

const filter = function(req,file,cb){
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
        cb(null, true)
    }
    else{
        cb(null,false)
    }
}
const upload = multer({
    storage : storage,
    filter : filter
});

 


module.exports = upload;