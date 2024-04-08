const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({name: user.name, email, token, _id:user._id, credits: user.credits})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password, password_confirm} = req.body

  try {
    const user = await User.signup(name, email, password, password_confirm)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({name, email, token, _id:user._id, credits: user.credits})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUserCredits = async (req, res) => {
  const user_id = req.params.user_id;

  // Fetch user from the database
  const user = await User.findById(user_id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Respond with user's credits
  res.status(200).json({ credits: user.credits });
};

// Subtract 10 credits from the user
const subtractCredits = async (req, res) => {
  const user_id = req.params.user_id; // Assuming you pass userId in the URL

  try {
    // Find the user by ID
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Subtract 10 credits from the user's credits field
    user.credits -= 10;

    // Save the updated user
    await user.save();

    // Respond with the updated user
    res.status(200).json({ message: "Credits subtracted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add 10 credits to the user
const addCredits = async (req, res) => {
  const user_id = req.params.user_id; // Assuming you pass userId in the URL

  try {
    // Find the user by ID
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Subtract 10 credits from the user's credits field
    user.credits += 10;

    // Save the updated user
    await user.save();

    // Respond with the updated user
    res.status(200).json({ message: "Credits added successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser, subtractCredits, addCredits, getUserCredits }