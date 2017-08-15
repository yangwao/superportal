const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const PORT = process.env.PORT
const CWD = process.cwd()
const config = require(CWD + '/config.json')

const crypto = require('crypto')

router.get('/', function (req, res, next) {

  let data = req.query.member + req.query.token
  let hash = crypto.createHash('sha512').update(data).digest("hex")

  res.cookie('member', req.query.member)
  res.cookie('token', req.query.token)
  res.cookie('appId', req.query.appId)
  res.cookie('hash', hash)
  res.render('register', {
    title: 'setup stage',
    url: '/auth',
    action: 'try authtenticate with your device'
  })
});

router.get('/generate', function (req, res, next) {

  let user = {
    member: uuid.v4(),
    tmpToken: uuid.v4(),
    appId: uuid.v4()
  }

  let url = 'http://' + config.server.domain + ':' + PORT +
    '/register' + '?member=' + user.member +
    '&token=' + user.tmpToken +
    '&appId=' + user.appId

  res.render('register', {
    title: 'register',
    user: user,
    url: url,
    action: 'register my device'
  })
})

module.exports = router;
