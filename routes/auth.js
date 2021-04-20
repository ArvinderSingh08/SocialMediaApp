const express= require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')
const {JWT_SECRET} =require('../config/keys')

const requireLogin=require('../middleware/requireLogin')


router.post('/signup',(req,res)=>
{
    const{name,email,password}=req.body

    if(!email || !password || !name)
    {
        return res.status(422).json({error:"please add all the fields"})
    }
    res.json({message:"successfully created"})
    User.findOne({email:email}).then((savedUser)=>
    {
        if(savedUser)
        {
            return res.status(422).json({error:"Invalid email !!!  User already exist"})
        }

        //HASHING THE PASSWORD
        bcrypt.hash(password,12).then(hashedpassword=>
            {
                const user=new User({
                    email,
                    password: hashedpassword,
                    name
                })
                user.save().then(user=>
                    {
                        res.json({message: "saved succesfully"})
                    })
                    .catch(err=>
                        {
                            console.log(err)
                        })
            })
    })
    .catch(err=>
        {
            console.log(err)
        })
})


router.post('/signin',(req,res)=>
{
    const {email,password}=req.body
    if(!email || !password)
    {
        return res.status(422).json({error: "Add your email and password"})
    }
    User.findOne({email:email}).then(savedUser=>
        {
            if(!savedUser)
            {
                return res.status(422).json({error: "Invali email or password"})   
            }
            //CHECKING FOR WEATHER EMAIL AND PASSWORD IS CORRECT
            bcrypt.compare(password,savedUser.password).then(doMatch=>
                {
                    if(doMatch)
                    {
                        //res.json({message:" Successfully signed in"})
                        // PROVIDING JWT TOKEN 
                        const token= jwt.sign({_id: savedUser._id},JWT_SECRET)
                        const {_id, name, email}=savedUser
                        res.json({token, user: {_id, name, email}})
                    }
                    else
                    {
                        return res.status(422).json({error: "Invalid email or password"})
                    }
                })
                .catch(err =>
                    {
                        console.log(err)
                    })
        })
})

module.exports= router