var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  res.render('test', { title: 'Test Page', message: 'le caca est cuit ' });
});

router.get('/login', function (req, res, next) {
  res.render('loginsimple', { title: 'Login Page' });
});

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.render('test', { title: 'page admin', message: 'Bienvenue admin' });
  } else if (username === 'mds' && password === 'mds') {
    res.render('test', { title: 'page élève', message: 'Bienvenue élève' });
  } else {
    res.send('Identifiants incorrects');
  }
});

router.get('/tchat', function (req, res, next) {
  res.render('tchat', { title: 'Chat en temps réel' });
});



module.exports = router;
