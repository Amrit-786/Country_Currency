const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async(req,res)=>{
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const user = new User({email,password});
        await user.save();
        res.status(201).json({message:'user created successfully'});

    }
    catch(error){
        res.status(500).json({message:'error creating user', error: error.message});
    }
});


router.post('/login', async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:'invalid credentials'});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expire:'1d'});
        res.json({token,userId:user._id});
    }
    catch(error){
        res.status(500).json({message:'error logging in', error:error.message});
    }
});

module.exports = router;