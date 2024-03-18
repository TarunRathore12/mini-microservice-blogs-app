const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// Initially storing data on run time
const posts = {};

// Handled cors issue which blocks frontend to access backend
app.use(cors());

// The below statement parses each incoming request & make the req body accessible to backend
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  // Using crypto in order to associate each post with a random ID
  const id = randomBytes(4).toString('hex');
  console.log("checking body request >>>>>>", req.body);
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("listening on 4000 for POSTS Service !!!");
});