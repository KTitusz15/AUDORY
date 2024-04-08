const express = require('express');
const { loginUser, signupUser, subtractCredits, getUserCredits, addCredits } = require('../controllers/userController');


const requireAuth = require('../middleware/requireAuth'); // Importing requireAuth middleware

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Subtract credits route - Requires authentication
router.patch('/:user_id/subtract-credits', requireAuth, subtractCredits);

// Add credits route - Requires authentication
router.patch('/:user_id/add-credits', requireAuth, addCredits);

router.get('/:user_id/credits', getUserCredits)

module.exports = router;
