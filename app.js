require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const path = require('path');
const likes = require('./src/router/post.likes.router');
const followers = require('./src/router/user.followers.router');

// app.use('/api' /* 라우터*/);
app.use('/apl', [likes, followers]);

app.use(express.static(path.join(__dirname, './public')));

// 메인
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
