const express = require('express');
const router = express.Router();

const CategoryController = require('../Controller/CategoryController');

router.get('/showCategory', CategoryController.showCategory);
router.get('/createCategory', CategoryController.createCategory);
router.post('/newCategory', CategoryController.newCategory);
router.get('/:id/editCategory', CategoryController.editCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
