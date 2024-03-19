const express = require('express');
const {
  createLike,
  getLikesByPostId,
  checkPostLike,
  getLikes,
  deleteLike
} = require('../controllers/likeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all like routes
router.use(requireAuth);

// GET all likes
router.get('/', getLikes);

// GET the number of likes by post_id
router.get('/count/:post_id', getLikesByPostId);

// GET route to check if the post is liked by the current user
router.get('/check/:post_id', checkPostLike);

// POST a new like
router.post('/:post_id', createLike);

// DELETE a like
router.delete('/:post_id', deleteLike);

module.exports = router;
