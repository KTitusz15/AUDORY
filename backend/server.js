require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/likes');
const commentRoutes = require('./routes/comments');

// express app
const app = express();

// middleware

// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(cors({
  origin: 'https://audory.vercel.app'
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
