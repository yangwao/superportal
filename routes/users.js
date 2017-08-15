var express = require('express')
var router = express.Router()
const uuid = require('uuid')
const PORT = process.env.PORT

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/generate', function(req, res, next) {
  let user = {
      member: uuid.v4(),
      tmpToken: uuid.v4(),
      appId: uuid.v4()
    }

  logger.info('generated new token', user)
  let url = 'localhost:' + PORT + '/register' +
            '?member=' + user.member +
            '&token=' + user.tmpToken  +
            '&appId=' + user.appId +
            '&rId=' + req.query.rId

  res.status(200).send({ user: user, url: url})
})

router.get('/register', function(req, res, next) {
  res.status(200).send()
})
