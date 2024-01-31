const express = require('express');
const router = express.Router();

const ProductController = require('../Controller/ProductController');

router.get('/showProduct', ProductController.showProduct);
router.get('/createProduct', ProductController.createProduct);
router.post('/newProduct', ProductController.newProduct);
router.get('/:id/editProduct', ProductController.editProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/detailProduct/:id', ProductController.showDetailProduct);

module.exports = router;
