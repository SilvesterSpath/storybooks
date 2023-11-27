const express = require('express');
const passport = require('../config/passport');
const router = express.Router();

// @desc Authe with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;
