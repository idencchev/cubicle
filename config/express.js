const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const selectedHbsHelper = require('../helpers/selectedHbsHelper');

module.exports = (app, express) => {
    app.engine('hbs', handlebars({ // Setup the view engine
        extname: 'hbs'
    }))
        .set('view engine', 'hbs')
        .use(express.urlencoded({ extended: true }))  // Setup the body parser
        .use(express.static('static')) // Setup the static files
        .use(cookieParser())
        .use(auth());
        selectedHbsHelper(); // Handlebars helper function for 'selected' HTML attribute
};