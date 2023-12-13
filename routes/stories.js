const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Story = require('../models/Story');

// Show add page
// GET /stories/add
router.get('/add', auth.ensureAuth, (req, res) => {
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

// Show all stories
// GET /stories
router.get('/', auth.ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('stories/index', { stories });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

// Edith stories
// Put /stories/edit/:id
router.get('/edit/:id', auth.ensureAuth, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();

  if (!story) {
    return res.render('error/404');
  }

  if (story.user.toString() !== req.user.id) {
    res.redirect('/stories');
  } else {
    res.render('stories/edit', { story });
  }
});

// Update story
// PUT /stories/:id
router.put('/:id', auth.ensureAuth, async (req, res) => {
  console.log('this', req.params.id);
  let story = await Story.findOne({ _id: req.params.id }).lean();

  if (!story) {
    return res.render('error/404');
  }

  if (story.user.toString() !== req.user.id) {
    res.redirect('/stories');
  } else {
    story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.redirect(`/dashboard`);
  }
});

module.exports = router;
