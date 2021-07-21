const express = require('express');
const auth = require('./routes/auth');
const post = require('./routes/post');

const app = express();

app.use(express.json());

app.use('/auth', auth);
app.use('/post', post);

app.get('/', (req, res) => {
  res.send('Hello there!!!');
});

app.listen(5000, () => {
  console.log('running on 5000 port');
});
