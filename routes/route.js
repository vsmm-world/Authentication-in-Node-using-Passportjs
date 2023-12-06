const express = require("express");
const router = express.Router();
const {upload} = require('../middleware/imageHandler');
const File = require('../models/file');
const { PassInit, isAuthenticted } = require('../auth/passportConf');
const passport = require('passport');
PassInit(passport);


router.route('/login').post(passport.authenticate('local'),(req,res)=>{
    res.status(200).json({ message: "Succsess" });
})

router.route('/img').post(upload.single('avatar'),async(req,res)=>{
    const file = new File({
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });
    await file.save().then((result)=>{
        console.log(result);
        res.status(200).json({message:"File Uploaded Succsessfully"});
    })
});


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
