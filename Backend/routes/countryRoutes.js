const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/currency/:code', auth, async(req,res)=>{
    try{
        const {code} = req.params;
        const res = await axios.get(`https://restcountries.com/v3.1/currency/${code}`);
        res.json(res.data);
    }
    catch(error){
        res.status(500).json({message:'error fetching countries', error: error.message});
    }
});

module.exports = router;