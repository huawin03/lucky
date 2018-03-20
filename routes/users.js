const router = require('koa-router')();

// router.prefix('/users')
const userModel = require('../lib/index.js');
const md5 = require('md5');
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
