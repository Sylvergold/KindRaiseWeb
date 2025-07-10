require("dotenv").config()
const mongoose=require("mongoose");
const keepServerAlive = require('../middleware/keepServerAlive');

const url=process.env.DATABASE_URL

mongoose.connect(url).then(()=>{
    keepServerAlive();

    console.log(`Database has been connected to MongoDB successfully`)
}).catch((error)=>{
    console.log(`Error connecting to database because ${error}`)
}) 