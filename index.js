const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./config/db');

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

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
