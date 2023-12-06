const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// @desc Login/Landing page
// @route GET /
router.get('/', auth.ensureGuest, (req, res) => {
  res.render('loginview', { layout: 'layouts/login' });
});

router.get('/header', (req, res) => {
  res.render('partials/header', { layout: 'layouts/main' });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', auth.ensureAuth, (req, res) => {
  res.render('dashboard', { layout: 'layouts/main' });
});

module.exports = router;
