const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    default: 10
  }
})

// static signup method
userSchema.statics.signup = async function(name, email, password, credits) {

  // validation
  if (!name || !email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const existsName = await this.findOne({ name })

  if (existsName) {
    throw Error('Name already in use')
  }

  const existsEmail = await this.findOne({ email })

  if (existsEmail) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash, credits })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Invalid login credentials')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Invalid login credentials')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)