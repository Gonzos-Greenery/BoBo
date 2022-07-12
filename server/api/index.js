const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/movies', require('./movies.js'));
router.use('/party', require('./party'));
router.use('/userrating', require('./userrating'));
router.use('/partyrating', require('./partyrating'));
// router.use('/auth', require('./auth'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
