const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, JWT_SECRET } = require('../config/config');

async function createUser(data) {
    const isUserExists = await User.find({ username: data.username });

    if (isUserExists.length) {
        throw 'This username already exists!';
    }
    if (Object.keys(data).some(x => data[x] == '')) {
        throw 'All fields are required!'
    }
    if (data.password !== data.repeatPassword) {
        throw 'Passwords not match!'
    }

    bcrypt.hash(data.password, SALT_ROUNDS, async (err, hash) => {
        if (err) console.log(err);
        data.password = hash;
        let user = new User(data);
        return await user.save();
    });



}

async function loginUser(data) {
    if (Object.keys(data).some(x => data[x] == '')) {
        throw 'All fields are required!'
    }

    const { _id, username, password } = await User.findOne({ username: data.username.toLowerCase() }) || {};
    if (!username) {
        throw 'This username does not exist!';
    }

    const match = await bcrypt.compare(data.password, password);

    if (!match) {
        throw 'Wrong password!';
    }

    const token = jwt.sign({ id: _id }, JWT_SECRET)
    return token;
}

module.exports = {
    createUser,
    loginUser
}