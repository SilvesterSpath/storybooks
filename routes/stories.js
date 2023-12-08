const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Story = require('../models/Story');

// Show add page
// GET /stories/add
router.get('/add', auth.ensureAuth, async (req, res) => {
  res.render('stories/add');
});

// Process add form
// POST /stories
router.post('/', auth.ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    /*     const story = new Story({
      title: req.body.title || 'Untitled',
      content: req.body.content || 'default content',
      user: req.user.id,
    }); */
    /* await story.save(); */
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500', { error });
  }
});

module.exports = router;
