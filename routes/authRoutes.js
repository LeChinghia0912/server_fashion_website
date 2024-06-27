const express = require('express');
const passport = require('passport');
const router = express.Router();

// Middleware kiểm tra đã đăng nhập trước khi truy cập vào trang đăng nhập
function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin'); // Chuyển hướng về trang chủ admin nếu đã đăng nhập
}

// Middleware kiểm tra đăng nhập trước các route bảo vệ
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

// ROUTES
router.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: 'ĐĂNG NHẬP HỆ THỐNG ADMIN',
        error: req.query.error,
    };

    res.render('login', response);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.render('login', { title: 'Login', error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/admin'); // Chuyển hướng về trang chủ admin sau khi đăng nhập thành công
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, function (req, res) {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;
