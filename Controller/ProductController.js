const Product = require('../models/Product');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class ProductController {
    showProduct = async (req, res, next) => {
        try {
            const products = await Product.find({});
            const responseData = mutipleMongooseToObject(products);

            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                res.json({ products: responseData });
            } else {
                res.render('product/show', { products: responseData });
            }
        } catch (error) {
            console.error('Error in showProduct:', error);
            next(error);
        }
    };

    createProduct(req, res, next) {
        res.render('product/createProduct');
    }

    async newProduct(req, res, next) {
        const productData = req.body;
        const product = new Product(productData);
        try {
            await product.save();
            res.redirect('/product/showProduct');
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async editProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            res.render('product/editProduct', {
                product: mongooseToObject(product),
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            await Product.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/product/showProduct');
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            await Product.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
