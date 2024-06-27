const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');

const db = require('./config/db');
const Account = require('./models/Account'); // Sử dụng model Account thay vì User

db.connect();
const port = 8000;

const router = require('./routes');

app.use(methodOverride('_method'));

app.use(cors());
app.use((req, res, next) => {
    const acceptHeader = req.get('Accept');
    req.isJSON = acceptHeader && acceptHeader.includes('application/json');
    next();
});

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(morgan('combined'));

//teamplate engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Router
router(app);

// Express session
app.use(
    session({
        secret: 'yourSecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await Account.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(
    new localStrategy(async function (username, password, done) {
        try {
            const user = await Account.findOne({ username: username });
            if (!user) return done(null, false, { message: 'Incorrect username.' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
);

// Middleware kiểm tra đăng nhập toàn cục trước các route bảo vệ
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Middleware kiểm tra đã đăng nhập trước khi truy cập vào trang đăng nhập
function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

// Thêm middleware kiểm tra đăng nhập toàn cục trước các route
app.use((req, res, next) => {
    if (req.isAuthenticated() || req.path === '/login' || req.path === '/logout') {
        return next();
    }
    res.redirect('/login');
});

// ROUTES
app.get('/', isLoggedIn, (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', isLoggedIn, (req, res) => {
    res.render('index', { title: 'About' });
});

app.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: 'ĐĂNG NHẬP HỆ THỐNG ADMIN',
        error: req.query.error,
    };

    res.render('login', response);
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.render('login', { title: 'Login', error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
});

app.get('/logout', isLoggedIn, function (req, res) {
    req.logout();
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
