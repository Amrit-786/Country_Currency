const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();
router.get('/favorites', auth, async(req,res)=>{
    try{
        const user = await User.findById(req.userId);
        res.json(user.favorites);
    }
    catch(error){
        res.status(500).json({message:'error fetching favorites', error:error.message});
    }
});

router.post('/favorites', auth, async(req,res)=>{
    try{
        const {countryCode} = req.body;
        const user = await User.findById(req.userId);
        if(!user.favorites.includes(countryCode)){
            user.favorites.push(countryCode);
            await user.save();
        }
        res.json(user.favorites);
    }
    catch(error){
        res.status(500).json({message:'error adding fav', error:error.message});
    }
});

router.delete('/favorites/:countryCode', auth, async(req,res)=>{
    try{
        const {countryCode} = req.params;
        const user = await User.findById(req.userId);
        user.favorites = user.favorites.filter(code=> code!== countryCode);
        await user.save();
        res.json(user.favorites);
    }
    catch(error){
        res.status(500).json({message:'error removing fav', error:error.message});
    }
});

router.get('/search-history', auth, async(req,res)=>{
    try{
        const user = await User.findById(req.userId);
        res.json(user.searchHistory);
    }
    catch(error){
        res.status(500).json({message:'error fetchng seach history', error:error.message});
    }
});

router.post('/search-history', auth, async(req,res)=>{
    try{
        const {searchTerm} = req.body;
        const user = await User.findById(req.userId);
        user.searchHistory = [searchTerm, ...user.searchHistory.filter(term=> term !== searchTerm)].slice(0,5);
        await user.save();
        res.json(user.searchHistory);

    }
    catch(error){
        res.status(500).json({message:'error updating search history', error:error.message});
    }
});

module.exports = router;