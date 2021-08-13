const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')


const app = express()

const upload = multer({
    dest: 'images'
})

app.post('/upload',upload.single('upload'), (req,res)=>{
    res.send()
})

app.use(express.json())
app.use(userRouter) 
app.use(taskRouter)
 



module.exports = app



