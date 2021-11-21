const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
// const { createStorypost, createStorycomment, getStorypost, getStorycomment } = require('./controller');
const { createStorypost , createStorycomment , getStorypost , getStorycomment , getStorycommentFromStorypost } = require('./controller');
const router = express.Router();

router.post('/storypost/:getStorypostId/storycomment', createStorycomment);
router.post('/storypost', [upload.single('img')], createStorypost);

// router.post('/storypost/:getStorypostId/img', updateStorypost);

router.get('/storypost/:getStorypostId', getStorypost);
router.get('/storypost/', getStorypost);
router.get('/storypost/:getStorypostId/storycomment/', getStorycommentFromStorypost);

router.get('/storycomment/:getStorycommentId', getStorycomment);
router.get('/storycomment/', getStorycomment);

router.get('/', function (req, res) {
    res.send('Health check is good :)');
});

module.exports = router