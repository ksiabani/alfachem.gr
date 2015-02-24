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
        path: req.path,
        message: '',
        errors: {}
    });
});

router.post('/contact', function (req, res) {
    req.assert('name', 'Name is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();
    var errors = req.validationErrors();
    var mailOptions = {
        from: req.body.name + "\u003C" + req.body.email + "\u003E",
        to: "feedback@anyco.com",
        subject: "Inquiry",
        text: req.body.message
    }

    if (!errors) {
        transport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
            transport.close();
            res.render('contact', {
                message: 'Message sent!',
                errors: {}
            });
        });
    }else{
        res.render('contact', {
            message: '',
            errors: errors
        });

    }

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