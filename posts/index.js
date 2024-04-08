const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

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

app.post('/posts', async (req, res) => {
  // Using crypto in order to associate each post with a random ID
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  // Sending the event to event-bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title }
  });

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("listening on 4000 for POSTS Service !!!");
});