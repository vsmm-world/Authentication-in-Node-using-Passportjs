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

module.exports = router;
