const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

// create new post
router.post('/posts', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        console.log(res.body);
      await newPost.save();
      res.status(201).json({ message: 'Post created', data: newPost });
    } catch (error) {
      res.status(400).json({ error: 'Error creating post' });
    }
  });

// Get all blog posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: "Error fetching posts" });
  }
});

// Get a single blog post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: "Error fetching post" });
  }
});

// Update a blog post
router.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post updated", data: updatedPost });
  } catch (error) {
    res.status(400).json({ error: "Error updating post" });
  }
});

// Delete a blog post
router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting post" });
  }
});

module.exports = router;
