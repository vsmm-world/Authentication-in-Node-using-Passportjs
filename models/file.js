const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});

const File = new mongoose.model('file', fileSchema);
module.exports = File;