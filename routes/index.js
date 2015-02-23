var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', {
        path: req.path
    });
});

router.get('/products', function(req, res) {
    res.render('products', {
        path: req.path
    });
});

router.get('/contact', function(req, res) {
    res.render('contact', {
        path: req.path
    });
});

router.get('/about', function(req, res) {
    res.render('about', {
        path: req.path
    });
});

router.get('/setlocale/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.locals.locale = req.params.locale;
    res.redirect('back');
});

module.exports = router;