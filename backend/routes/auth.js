const express = require('express');
const bcrypt = require("bcryptjs");
const {loginValidation,registerValidation} = require('../validation')
const User = require('../models/User')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');

const router = express.Router();
dotenv.config();

router.post('/email',async(req,res)=>{

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      
      let mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
      };
      
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).send("Email does not Exist")  
        } else {
            res.status(200).send("Email Sent Successfully")
        }
      });
})

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
        res.send(savedUser);
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
    res.send("Logged In");
})


module.exports = router