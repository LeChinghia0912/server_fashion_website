const CategoryRouter = require('./category');
const SliderRouter = require('./slider');
const DashboardRouter = require('./dashboard');
const ProductRouter = require('./product');
const AccountRouter = require('./account');
const AuthRouter = require('./authRoutes');
function routes(app) {
    app.use('/category', CategoryRouter);

    app.use('/slider', SliderRouter);

    app.use('/product', ProductRouter);

    app.use('/account', AccountRouter);

    app.use('/auth', AuthRouter);

    app.use('/', DashboardRouter);
}

module.exports = routes;
