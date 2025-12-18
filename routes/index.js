var express = require('express');
var router = express.Router();
const { join } = require('node:path');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  if (req.session.username) {
    res.render('test', {
      title: req.session.isAdmin ? 'Page Admin' : 'Page Élève',
      message: `Bienvenue ${req.session.username} ! 🎉`,
      username: req.session.username,
      isAdmin: req.session.isAdmin
    });
  } else {

    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    req.session.username = username;
    req.session.isAdmin = true;

    res.render('test', {
      title: 'Page Admin',
      message: `Bienvenue ${username} ! 🎉`,
      username: username,
      isAdmin: true
    });
  } else if (username === 'mds' && password === 'mds') {
    req.session.username = username;
    req.session.isAdmin = false;

    res.render('test', {
      title: 'Page Élève',
      message: `Bienvenue ${username} ! 🎉`,
      username: username,
      isAdmin: false
    });
  } else {

    res.render('loginsimple', {
      title: 'Login',
      error: '❌ Identifiants incorrects !'
    });
  }
});

router.get('/tchat', function (req, res, next) {
  res.render('tchat', { title: 'Chat en temps réel' });
});

router.get('/download', function (req, res, next) {
  res.render('download', { title: 'Télécharger l\'image' });
});

// 🔓 Route de déconnexion
router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
    res.redirect('/login');
  });
});

router.get('/', function (req, res, next) {
  res.status(404).render('404', { title: 'Page introuvable' });
});


module.exports = router;
