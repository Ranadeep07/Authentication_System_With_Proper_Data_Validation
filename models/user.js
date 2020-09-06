const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;