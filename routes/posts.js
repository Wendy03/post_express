const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');

/* GET users listing. */
router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createPost);

router.patch('/:id', PostsControllers.editPost);

router.delete('/', PostsControllers.delAllPosts);

router.delete('/:id', PostsControllers.delPost);

module.exports = router;
