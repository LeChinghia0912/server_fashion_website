const CategoryRouter = require('./category');
const SliderRouter = require('./slider');
const DashboardRouter = require('./dashboard');
const ProductRouter = require('./product');

function routes(app) {
    app.use('/category', CategoryRouter);

    app.use('/slider', SliderRouter);

    app.use('/product', ProductRouter);

    app.use('/', DashboardRouter);
}
module.exports = routes;
