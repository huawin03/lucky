const router = require('koa-router')();

// router.prefix('/users')
const userModel = require('../lib/index.js');
const md5 = require('md5');
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;
const checkLogin = require('../middlewares/check.js').checkLogin;

router.get('/signin', async function (ctx, next) {
  await ctx.render('signin',{
    session: ctx.session || ''
  });
})

router.post('/signin', async function (ctx, next) {
  
})

module.exports = router
