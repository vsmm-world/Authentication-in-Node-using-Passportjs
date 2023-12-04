const User = require('../models/user');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {

    const { name, username, email, password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {

        await User.create({
            name,
            username,
            email,
            password:hash,
        }).then((e) => {

            res.status(200).json({ message: "Succsess" });
            console.log(e);
        }).catch(() => {
            res.status(400).json({
                message: 'Not Registerd'
            })
        })
    })
}
module.exports = register;