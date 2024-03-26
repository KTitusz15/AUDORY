const express = require('express');
const {
    getCommentsById,
    createComment,
    deleteComment,
    editComment
} = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all like routes
router.use(requireAuth);

// GET all comments for a post
router.get('/:post_id', getCommentsById);

// POST a new comment
router.post('/:post_id', createComment);

// DELETE a comment
router.delete('/:id', deleteComment);

// UPDATE a comment
router.patch('/:id', editComment);

module.exports = router;
