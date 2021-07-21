const router = require('express').Router();

const { publicPosts, privatePosts } = require('../db');
const checkAuth = require('../middleware/checkAuth');

router.get('/public', (req, res) => {
  res.json({
    posts: publicPosts
  });
});

router.get('/private', checkAuth, (req, res) => {
  res.json({
    posts: privatePosts
  });
});

module.exports = router;
