var express = require('express')
var router = express.Router()
const uuid = require('uuid')
const PORT = process.env.PORT

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/generate', function(req, res, next) {
  
  logger.info('xxx')
  let user = {
      member: uuid.v4(),
      tmpToken: uuid.v4(),
      appId: uuid.v4()

    }
  let url = 'localhost:' + PORT + '/register' + '?member=' + user.member + '&token=' + user.tmpToken  + '&appId=' + user.appId

  res.status(200).send({ user: user, url: url})
})
