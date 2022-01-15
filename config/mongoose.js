const mongoose = require('mongoose');
const { DB_CONNECTION, CONNECTED_TO } = require('./config');

module.exports = (app) => {
    mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log(`You are connected to ${CONNECTED_TO}!`));
};