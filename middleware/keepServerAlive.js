const http=require("http")
const https=require("https")
  
const keepServerAlive=()=>{
    const url=`https://Kindraise.onrender.com/`
    const protocol= url.startsWith('https')?https:http;
    setInterval(()=>{
        protocol.get(url,(res)=>{
            console.log(`Pinging the server: ${url}-status Code:${res.statusCode}`)
        }).on("error",(err)=>{
            console.error(`Error pinging the server:${err.message}`)
        })
    },300000);
}

module.exports=keepServerAlive   
