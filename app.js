const express = require("express");
const ConnectDB = require("./db/connection");
const app = express();
const expressSession = require('express-session');
const passport = require("passport");
const port = process.env.port || 5000;
const register = require('./auth/auth');
const {PassInit,isAuthenticted} = require('./auth/passportConf');
const multer = require('multer');



// Middlwere Usages 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
PassInit(passport);
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");


//Server Initial Setup 
ConnectDB();
app.listen(port, () => {
    console.log(`website is runnig at : http://localhost:${port}`);
});


// Get Request Handeling 
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/register", (req, res) => {
    res.status(200).render("register");
});
app.get("/login", (req, res) => {
    res.status(200).render("login");
});
app.get('/secret',isAuthenticted,(req,res)=>{
    res.render('secret');
})
app.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
  
});


// Post Requests Handeling

app.post('/api/register', register);
app.post('/api/login',passport.authenticate('local'),(req,res)=>{
    res.status(200).json({message:"Succsess"});
});

const upload = multer({ dest: 'uploads/' })
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/profile', upload.single('avatar'), function (req, res, next) {
   
        res.status(200).json({message:'File Uploaded'})
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

// app.post('/profile', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
//   })