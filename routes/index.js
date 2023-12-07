const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// @desc Login/Landing page
// @route GET /
router.get('/', auth.ensureGuest, (req, res) => {
  res.render('loginview', { layout: 'login' });
});

router.get('/header', (req, res) => {
  res.render('partials/header', { layout: 'main' });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', auth.ensureAuth, (req, res) => {
  console.log(req.user.lastName);
  res.render('dashboard', { name: req.user.lastName });
});

module.exports = router;
