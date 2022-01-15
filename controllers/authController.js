const { Router } = require('express');
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/login',isGuest, (req, res) => {
    res.render('loginPage', { title: 'Login' })
})
    .post('/login',isGuest, async (req, res) => {
        try {
            const token = await authService.loginUser(req.body);
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/')
        } catch (error) {
            res.render('loginPage', { error });
        }

    })
    .get('/register',isGuest, (req, res) => {
        res.render('registerPage', { title: 'Register' })
    })
    .post('/register',isGuest, async (req, res) => {
        try {
            await authService.createUser(req.body);
            res.redirect('/auth/login')
        } catch (error) {
            res.render('registerPage', { error })
        }
    })
    .get('/logout',isAuthenticated, (req, res) => {
        res.clearCookie(COOKIE_NAME);
        res.redirect('/auth/login');
    })

module.exports = router;