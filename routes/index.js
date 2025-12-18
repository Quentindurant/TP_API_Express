var express = require('express');
var router = express.Router();
const { join } = require('node:path');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 📄 Route /test - Lit la session pour afficher les infos
router.get('/test', function (req, res, next) {
  // Vérifier si l'utilisateur est connecté
  if (req.session.username) {
    // ✅ Connecté - Affiche les infos depuis la session
    res.render('test', {
      title: req.session.isAdmin ? 'Page Admin' : 'Page Élève',
      message: `Bienvenue ${req.session.username} ! 🎉`,
      username: req.session.username,
      isAdmin: req.session.isAdmin
    });
  } else {
    // ❌ Pas connecté - Redirige vers login
    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  // Vérification des identifiants
  if (username === 'admin' && password === 'admin') {
    // ✅ CRÉATION DE LA SESSION
    req.session.username = username; // On stocke le nom d'utilisateur
    req.session.isAdmin = true; // On stocke qu'il est admin

    res.render('test', {
      title: 'Page Admin',
      message: `Bienvenue ${username} ! 🎉`,
      username: username,
      isAdmin: true
    });
  } else if (username === 'mds' && password === 'mds') {
    // ✅ CRÉATION DE LA SESSION
    req.session.username = username;
    req.session.isAdmin = false;

    res.render('test', {
      title: 'Page Élève',
      message: `Bienvenue ${username} ! 🎉`,
      username: username,
      isAdmin: false
    });
  } else {
    // ❌ Identifiants incorrects
    res.render('loginsimple', {
      title: 'Login',
      error: '❌ Identifiants incorrects !'
    });
  }
});

router.get('/tchat', function (req, res, next) {
  res.render('tchat', { title: 'Chat en temps réel' });
});

// 🔓 Route de déconnexion
router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
    res.redirect('/login'); // Redirection vers la page de login
  });
});



module.exports = router;
