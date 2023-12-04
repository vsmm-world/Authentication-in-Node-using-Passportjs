const User = require('../models/user');

const register= async(req,res,next)=>{

    const {name,username,email,password}= req.body;

try{    await User.create({
        name,
        username,
        email,
        password,
    }).then((e)=>{

        res.status(200).json({message:"Succsess"});
        console.log(e);
    })}catch{
        res.status(400).json({
            message:'Not Registerd'
        })
    }
}

module.exports = register;