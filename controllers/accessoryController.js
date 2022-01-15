const { Router } = require('express');
const accessoryService = require('../services/accessoryService');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/create',isAuthenticated, async (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
})
    .post('/create',isAuthenticated, async (req, res) => {
        try {
            if (Object.keys(req.body).some(x => req.body[x] === '')) {
                throw 'All fields are required!'
            }
            await accessoryService.createAccessory(req.body);
            res.redirect('/');
        } catch (error) {
            res.render('createAccessory', { title: 'Create Accessory', error });
        }
    });

module.exports = router;