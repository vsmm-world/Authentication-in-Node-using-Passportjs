const express = require("express");
const ConnectDB = require("./db/connection");
const app = express();
const expressSession = require('express-session');
const passport = require("passport");
const port = process.env.port || 5000;
const register = require('./auth/auth');
const { PassInit, isAuthenticted } = require('./auth/passportConf');
// const {photos}= require('./middleware/imageHandler');
const fs = require('fs');
const path = require('path');
const { upload } = require('./middleware/imageHandler');
const File = require('./models/file');
PassInit(passport);


// Middlwere Usages 
// app.use('/data',require('./routes/route'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get('/secret', isAuthenticted, (req, res) => {
    res.render('secret');
})
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.get('/photos',async(req,res)=>{
    const imgs = await File.find({}).then((data,err)=>{
        if(err){
            console.log(err);
        }
        res.status(200).render('photos',{imgs:data})
    })
})
app.get('/photo',async(req,res)=>{
      res.status(200).render('photos')
})

// Post Requests Handeling

app.post('/data/img',upload.single('avatar'), async (req, res) => {
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    await File.create(obj).then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(400).json({ message: "Error" });
    }
    )


});
app.post('/api/register', register);
app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: "Succsess" });
});







