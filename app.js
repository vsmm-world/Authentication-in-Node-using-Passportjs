const express = require("express");
const ConnectDB = require("./db/connection");
const app = express();
const expressSession = require('express-session');
const passport = require("passport");
const port = process.env.port || 5000;
const register = require('./auth/auth');
const {PassInit,isAuthenticted} = require('./auth/passportConf');



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

ConnectDB();

app.listen(port, () => {
    console.log(`website is runnig at : http://localhost:${port}`);
});

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

    res.send(req.user);
    res.r
})
app.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
  
});


app.post('/api/register', register);
app.post('/api/login',passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/'}),(req,res)=>{
    res.status(200).json({message:"Succsess"});
});