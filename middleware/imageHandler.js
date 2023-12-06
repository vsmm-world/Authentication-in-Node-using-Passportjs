const File = require('../models/file');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage:storage});

const photos  = async()=>{
    const imgs = await File.find({});
    return imgs;
}

module.exports = {upload , photos} ; 