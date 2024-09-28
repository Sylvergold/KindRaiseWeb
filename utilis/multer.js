const cloudinary = require('../utilis/cloudinary'); 
const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if (file.mimetype.startsWith('image/')) {
        cb(null,true)
    }else{
        cb(new Error ('image only'),false)
    }
}  
const fileSize={
    limits:1024*1024*10
}
const uploads=multer({
    storage,
    fileFilter,
    limits:fileSize
})
  
module.exports=uploads



