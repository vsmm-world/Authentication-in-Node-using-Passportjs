const express = require('express');
const ConnectDB = require('./db/connection');
const app = express();
const port = process.env.port || 5000;


app.set('view engine', 'ejs');

ConnectDB()

app.listen(port,()=>{
    console.log(`website is runnig at : http://localhost:${port}`);

})


app.get('/',(req,res)=>{

    res.render('home');
})

app.get('/register',(req,res)=>{

    res.status(200).render('register');
})