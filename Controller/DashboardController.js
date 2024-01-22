class DashboardController {
    index(req, res, next) {
        res.render('home');
    }
}

module.exports = new DashboardController();
