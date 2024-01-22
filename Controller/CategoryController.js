const Category = require('../models/Category');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class CategoryController {
    async showCategory(req, res, next) {
        try {
            const categories = await Category.find({});
            const responseData = mutipleMongooseToObject(categories);

            const categoryNameArray = responseData.map((category) => category.name);

            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                res.json({ category: categoryNameArray });
            } else {
                res.render('category/show', { categories: responseData });
            }
        } catch (error) {
            next(error);
        }
    }

    createCategory(req, res, next) {
        res.render('category/createCategory');
    }

    async newCategory(req, res, next) {
        const categoryData = req.body;
        const category = new Category(categoryData);
        try {
            await category.save();
            res.redirect('/category/showCategory');
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async editCategory(req, res, next) {
        try {
            const category = await Category.findById(req.params.id);
            res.render('category/editCategory', {
                category: mongooseToObject(category),
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            await Category.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/category/showCategory');
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            await Category.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
