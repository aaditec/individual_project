const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// to store
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename:(req, file,cb) => {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '_' + Date.now() + ext);
    }
});

//filter
const imageFilter = (req, file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        let err = new Error("Only pic format are allowed");
        err.status = 400;
        return cb(err,false);
    }
    cb(null,true);
}

const upload = multer({
    storage: storage,
     fileFilter:imageFilter//,
    // limits:{
    //     fileSize:1024*1024
    // }
});

router.route('/uploads')
.post(upload.single('myFile'),(req,res,next)=>{
    res.json(req.file);
});

module.exports=router;