const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const index = require('./routes/index');
const users = require('./routes/users');
const passport = require('passport');
const PORT = 3000;
const app = express();

//Passport config
require('./config/passport')(passport);

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.json());

//Body Parser
app.use(express.urlencoded({ extended:false }))

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

//Passport middlewares
app.use(passport.initialize())
app.use(passport.session());

//Connect flash middleware
app.use(flash());

//Global middlewares
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


//Mongoose
mongoose.connect('mongodb://localhost/register', {useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>console.log("Connected to Database..."))
    .catch((e)=>console.log(e))

//Routes
app.use('/',index);
app.use('/users',users);


app.listen(PORT,console.log(`Application started on port ${PORT}`))