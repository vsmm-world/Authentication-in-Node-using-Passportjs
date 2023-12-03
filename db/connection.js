const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/passport';


const ConnectDB = async  ()=>{
    await mongoose.connect(uri).then(()=>{
        console.log('Connected to Database');
    })
}

module.exports = ConnectDB;


