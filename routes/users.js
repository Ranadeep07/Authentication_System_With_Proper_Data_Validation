const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Login
router.get('/login', async(req,res)=>{
    res.status(200).render('login');
})

router.post('/login', async(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
})

//Register
router.get('/register', (req,res)=>{
    res.status(200).render('register')
})
router.post('/register',(req,res)=>{
    let errors = []
    const {name,email,phone,password} = req.body
    
    //If password not valid
    if(password.length < 6){
        errors.push({ msg: "Password length must be greater than 6" });
    }
    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            phone,
            password,
        })
    }
    else{
    // Validation passed
    User.findOne({ email:email })
        .then(user=>{
            if(user){
                // If user already exists
                errors.push({ msg:" Email is already registered " })
                res.render('register',{
                    errors,
                    name,
                    email,
                    phone,
                    password,
                });
                
            }
            else{
                var data = new User({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:req.body.password,
                })
                //Hash Password
                bcrypt.genSalt(10,(err,salt)=> 
                    bcrypt.hash(data.password,salt,(err,hash)=>{
                        if(err) throw err;
                        //Set password to hashed password
                        data.password = hash;
                        //Saving data into database
                        data.save()
                            .then(()=>{
                                //For creating a success for succ reg
                                req.flash('success_msg','You are now registered')
                                res.redirect('login')})
                            .catch(e=> {
                                req.flash('error_msg','Sorry! There is an error')
                                res.redirect('register')
                                console.log(e)})
                }))

            }
        })
    
    }
})



module.exports = router;