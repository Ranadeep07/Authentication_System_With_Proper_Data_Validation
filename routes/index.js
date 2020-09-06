const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

//Welcome page
router.get('/', async(req,res)=>{
    res.status(200).render('welcome');
})

// Dashborad 
router.get('/users/dashboard',ensureAuthenticated, async (req,res)=>{
    req.flash('success_msg','You are Successfully logged Out!')
    res.status(200).render('dashboard',{
        name:req.user.name
    });
})
module.exports = router;