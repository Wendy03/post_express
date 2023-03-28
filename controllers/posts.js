const successHandler = require('../service/successHandler');
const errorHandler = require('../service/errorHandler');

const Post = require('../models/posts');

const posts = {
  async getPosts(req, res) {
    const posts = await Post.find();
    successHandler(res, posts);
  },
  async createPost(req, res) {
    try {
      const { name, content, image, createdAt } = req.body;
      if (content !== undefined) {
        const newPost = await Post.create({
          name,
          content,
          image,
          createdAt,
        });
        successHandler(res, newPost);
      } else {
        errorHandler(res, 'content 必填');
      }
    } catch (err) {
      errorHandler(res, '資料錯誤');
    }
  },
  async delAllPosts(req, res) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async delPost(req, res) {
    const id = req.params.id;
    const posts = await Post.findByIdAndDelete(id);
    successHandler(res, posts);
  },
  async editPost(req, res) {
    try {
      const { content, image, likes } = req.body;
      const id = req.params.id;
      if (content !== undefined) {
        const posts = await Post.findByIdAndUpdate(id, {
          $set: {
            content,
            image,
            likes,
          },
        });
        successHandler(res, posts);
      } else {
        errorHandler(res, '資料錯誤');
      }
    } catch {
      errorHandler(res, '查無此id');
    }
  },
};

module.exports = posts;
