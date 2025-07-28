const express = require('express');
const router = express.Router();

// home route
router.get('/', (req, res) => {
    res.render('index.html', { message: 'Welcome from /' });
});

// about route
router.get('/fcdo-design-system', (req, res) => {
    res.render('fcdo-design-system/fcdo-design-system.html');
});

// components route
router.get('/components', (req, res) => {
    res.render('components/components.html');
});


module.exports = router;
