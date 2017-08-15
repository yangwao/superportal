const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Superportal',
    url: 'http://localhost.dev:3333/auth'
  });
});

router.get('/auth', function (req, res, next) {
  console.log(`${req.cookies.appId} have hash ${req.cookies.hash}`);

  if (!req.cookies.hash) {
    res.render('index', {
      title: 'auth',
      auth: 'nope'
    })
  }

  if (req.cookies.hash && req.cookies.appId) {
    res.render('index', {
      title: 'auth',
      auth: 'ok'
    })
  }
})

module.exports = router;
