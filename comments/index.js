const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

// The below statement parses each incoming request & make the req body accessible to backend
app.use(bodyParser.json());

// Initially storing data on run time
const commentsByPostsId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostsId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  // Using crypto in order to associate each post with a random ID
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  console.log("checking req body", req.body);
  const comments = commentsByPostsId[req.params.id] || [];
  comments.push({
    commentId, content
  });
  commentsByPostsId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }      
  });

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("listening on 4001 for COMMENTS Service !!!");
});