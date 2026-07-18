const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.send("Hello world")

})
app.get('/tasks', (req,res)=>{
    res.send({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] })

})
app.get('/health', (req,res)=>{
     res.send({ "status": "ok" } )
})
app.listen(3001, ()=>{
    console.log("Server running!")
})