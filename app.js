const express = require('express');
const app = express();
const port = process.env.port || 5000;

app.set('view engine', 'ejs');



app.listen(port,()=>{
    console.log(`website is runnig at : http://localhost:${port}`);

})


app.get('/',(req,res)=>{

    res.render('home');
})

app.get('/register',(req,res)=>{

    res.status(200).render('register');
})