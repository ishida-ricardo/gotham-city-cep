const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    created_at: { 
        type: Date, 
        default: Date.now()
    },
    updated_at: { 
        type: Date, 
        default: Date.now() 
    },
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.APP_SECRET);
};

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;