const express=require('express')
const app=express()
const mongoose=require('mongoose')
const  PORT= process.env.PORT || 5000
const {MONGOURI}=require('./config/keys') // connecting with mongodb atlas


mongoose.connect(MONGOURI,{
    useNewUrlParser: true ,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>
{
    console.log("mongo is connected")
})

mongoose.connection.on('error' ,(err)=>{
    console.log("err connecting mongo", err)
})

require('./models/user')
require('./models/post')

app.use(express.json())// working as middleware parse krega data ko
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

//DEPLOYMENT CODE

if(process.env.NODE_ENV=="production")
{
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>
    {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>
{
    console.log("server is running on ",PORT)
})