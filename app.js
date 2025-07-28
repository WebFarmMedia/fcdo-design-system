const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
const PORT = 3000;

// configure nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
     noCache: true
});

// static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// use external routes
const pageRoutes = require('./routes/routes');
app.use('/', pageRoutes);

// start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
