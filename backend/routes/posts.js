const express = require('express')
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost
} = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
const { getPostsWithUserName } = require('../controllers/postController');

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getPosts)

//GET a single workout
router.get('/:id', getPost)

// POST a new workout
router.post('/', createPost)

// DELETE a workout
router.delete('/:id', deletePost)

// UPDATE a workout
router.patch('/:id', updatePost)


module.exports = router