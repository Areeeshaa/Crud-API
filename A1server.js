const express = require('express')
const app = express()
app.use(express.json())
let tasks = [{id:1, title:"OOP", done:true}, {id:2, title:"DSA", done:true}, {id:3, title:"PF", done:false}]
app.get('/',(req,res)=>{
    res.send("Hello world")

})
// app.get('/tasks', (req,res)=>{
//     res.send({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] })

// })
app.get('/tasks', (req,res)=>{
    res.send(tasks)

})
app.get('/tasks/:id', (req,res)=>{
    let idd= req.params.id;
    task = tasks.find(task=>{return task.id == idd})
    if (task){
       res.send({task})
    }
    else{
        res.status(404).send("Task not found!")
    }

})
app.post('/tasks', (req, res)=>{
    const task = {}
    if(!req.body.title){
        return res.status(400).send("Title is required")
    }
    if(!req.body.id){
        task.id = tasks.length+1
    }
    if (!req.body.done){
        task.done=false
    }
    task.title = req.body.title
    tasks.push(task)
    res.status(201).json(task)
})
app.put('/tasks/:id', (req, res)=>{
    task = tasks.find(task=>task.id == req.params.id)
    if(!task){
       return res.status(404).send("Unknown id")
    }
    if((req.body.title) && (req.body.done!==undefined)){
        task.title= req.body.title;
        task.done = req.body.done;
    }
    else if(req.body.title){
        task.title= req.body.title;
    }
    else if(req.body.done!== undefined){
        task.done = req.body.done;
    }
    else{
       return res.status(400).send("Bad request")
    }
    return res.send(task)
})
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;

    const index = tasks.findIndex(task => task.id == id);

    if (index === -1) {
        return res.status(404).send("Unknown id");
    }
    const deletedTask = tasks.splice(index, 1);
    res.status(204).send(deletedTask[0]);
});
app.get('/health', (req,res)=>{
     res.send({ "status": "ok" } )
})
app.listen(3001, ()=>{
    console.log("Server running!")
})