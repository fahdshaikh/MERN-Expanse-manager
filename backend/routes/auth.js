const express = require('express');
const bcrypt = require("bcryptjs");
const {loginValidation,registerValidation} = require('../validation')
const User = require('../models/User')
const dotenv = require('dotenv')

const router = express.Router();
dotenv.config();


router.post("/register", async(req,res)=>{
    const {error} = registerValidation(req.body)  
    if(error){
       return res.status(400).send(error.details[0].message)
    }

    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists){
        return res.status(400).send("Email already exists in the Database")
    }
    
    const hashedPassword = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    const user  = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.status(200).send("User Registered Successfully");
    } catch(err){
        res.statusCode(400).send(err)
    }
})

router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("Email does not Exist")
    }
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass){
        return res.status(400).send("Invalid Password")
    }
    res.status(200).send(user);
})


module.exports = router