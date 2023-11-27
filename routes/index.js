const express = require('express');
const router = express.Router();

// @desc Login/Landing page
// @route GET /
router.get('/', (req, res) => {
  res.render('loginview', { layout: 'layouts/login' });
});

router.get('/header', (req, res) => {
  res.render('partials/header', { layout: 'layouts/main' });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { layout: 'layouts/main' });
});

module.exports = router;
