const config = { // set the ports and DB for development or production. See package.json
    development: { // for development we start the server with npm start
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
        CONNECTED_TO: 'MongoDB Local',
        SALT_ROUNDS: 10,
        JWT_SECRET: 'ivan',
        COOKIE_NAME: 'USER_SESSION'
    },
    production: { // for production we start the server with npm run prod
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://idenchev:qweasdzxc@cluster0.fm1m3.mongodb.net/cubicle?retryWrites=true&w=majority', // Atlas
        CONNECTED_TO: 'MongoDB Atlas',
        SALT_ROUNDS: 10,
        JWT_SECRET: 'ivan',
        COOKIE_NAME: 'USER_SESSION'
    }
};

module.exports = config[process.env.NODE_ENV.trim()]