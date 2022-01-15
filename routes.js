const { Router } = require('express');
const productController = require('./controllers/productController');
const accsessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', productController);
router.use('/auth', authController);
router.use('/accessories', accsessoryController);

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;