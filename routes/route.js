const express = require("express");
const router = express.Router();
const { upload } = require('../middleware/imageHandler');
const File = require('../models/file');
const { PassInit, isAuthenticted } = require('../auth/passportConf');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
PassInit(passport);


router.route('/login').post(passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: "Succsess" });
})

router.route('/img').


// const upload = multer({ storage: storage })
// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

// app.post('/profile', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
//   })

module.exports = router;
