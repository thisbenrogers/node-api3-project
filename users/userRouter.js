const express = require('express');
const User = require('./userDb');
const Post = require('../posts/postDb');

const { validateUser, validateUserId, validatePost } = require("../utils/validation");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then(user => {
      res.status(200).json(req.body)
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error adding a user." })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Post.insert({ ...req.body, user_id: req.params.id })
    .then(post => {
      res.status(200).json({ ...req.body, user_id: req.params.id })
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding post."})
    })
});

router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting users" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting posts associated with this user" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(int => {
      res.status(200).json({ message: `Removed ${int} user`})
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing user" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  User.update(req.params.id, req.body)
    .then(int => {
      res.status(200).json({
        message: `Updated ${int} user`,
        newUser: { ...req.body, id: parseInt(req.params.id) }
      })
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating user" })
    })
});

module.exports = router;
