const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Loading user model
const User = require('../models/user');
const { use } = require('passport');
const passport = require('passport');

module.exports = function(passport){
    passport.use(
        new localStrategy({ usernameField: 'email' },(email,password,done)=>{
            // Match the user with email
            User.findOne({ email:email })
            .then(user=>{
                //If user is not there in DB
                if(!user){
                    return done(null,false,{ message:'User is not registered' });

                }

                // Now we have to match the password
                bcrypt.compare(password, user.password,(err,isMatch)=>{
                    if(err) throw err;
                    
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null, false, { message:'Password incorrect' })
                    }
                });
            })
            .catch(e=>console.log(e))
        })
    )
}

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id,function(err,user){
        done(err,user);
    })
})
