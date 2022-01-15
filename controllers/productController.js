const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/', async (req, res) => {
    const products = await productService.getAll(req.query);
    res.render('index', { title: 'Cubicle', products });
})
    .get('/about', (req, res) => {
        res.render('about', { title: 'About' });
    })
    .get('/details/:id', async (req, res) => {
        const product = await accessoryService.getWithAccsesories(req.params.id);

        res.render('details', { title: 'Details', product });
    })
    .get('/create', isAuthenticated, (req, res) => {
        res.render('create', { title: 'Create' });
    })
    .post('/create', isAuthenticated, async (req, res) => {
        try {
            if (Object.keys(req.body).some(x => req.body[x] === '')) {
                throw 'All fields are required!';
            }
            await productService.createData(req.body, req.user);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.render('create', { title: 'Create', error });
        }
    })
    .get('/accessories/:productId/attach', isAuthenticated, async (req, res) => {
        const product = await productService.getOne(req.params.productId);
        const accessories = await accessoryService.filterAccssesories(product.accessories);

        res.render('attachAccessory', { title: 'Attach Accessory', product, accessories });
    })
    .post('/:id/attach', isAuthenticated, async (req, res) => {
        accessoryService.attachAccessory(req.params.id, req.body.accessory);

        res.redirect(`/details/${req.params.id}`);
    })
    .get('/edit/:productId', isAuthenticated, async (req, res) => {
        const product = await productService.getOne(req.params.productId);
        res.render('editCubePage', { title: 'Edit', product })
    })
    .post('/edit/:productId', isAuthenticated, async (req, res) => {
        await productService.editData(req.params.productId, req.body);
        res.redirect(`/details/${req.params.productId}`)

    })
    .get('/delete/:productId', isAuthenticated, async (req, res) => {
        const product = await productService.getOne(req.params.productId);
        if (req.user.id != product.creatorId) {
            res.redirect('/');
        } else {
            res.render('deleteCubePage', { title: 'Delete', product });
        }
    })
    .post('/delete/:productId', isAuthenticated, async (req, res) => {
        await productService.deleteData(req.params.productId);
        res.redirect('/');
    })

module.exports = router;