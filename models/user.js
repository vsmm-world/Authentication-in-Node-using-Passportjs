const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const User = new mongoose.model('user',UserSchema);
module.exports = User;
