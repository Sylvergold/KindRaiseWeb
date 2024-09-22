const express = require("express")
const router = require("./router/individualRouter.js")
const npoRouter = require("./router/npoRouter")
const campaignrouter = require("./router/campaignRouter.js")
const donationRouter = require("./router/donationRouter.js")
const adminrouter = require("./router/adminRouter.js")
const cors = require("cors")
const morgan = require("morgan")
 
const env = require("dotenv").config()
const db = require("./Config/dbConfig.js")
const app = express()

const port = process.env.PORT
    
app.use(express.json())
router.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"*"}))
app.use(morgan("dev"))
app.use("/api/v1/", router) 
app.use("/api/v1/", npoRouter)
app.use("/api/v1/", campaignrouter)
app.use("/api/v1", donationRouter)
app.use("/api/v1", adminrouter)

app.get('/1', (req, res) => {
    res.send('Server is alive!');
});
app.get('/', (req, res) => {
    res.send('Welcome to Kindraise!');
});


app.listen(port,(req,res)=>{
    console.log(`Server is running on http://localhost:${port}`)
}) 


