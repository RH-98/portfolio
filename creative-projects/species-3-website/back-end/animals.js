const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();

const mongoose = require('mongoose');

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for animals in sanctuary.
const animalSchema = new mongoose.Schema({
  name: String,
  sci_name: String,
  habitat: String,
  path: String,
  description: String,
  status: String,
  fav: Boolean,
});

// Create a model for animals in sanctuary.
const Animal = mongoose.model('Animal', animalSchema);

// Schema for comments
const commentSchema = new mongoose.Schema({
  animal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Animal'
  },
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  },
  comment: String,
})

// Model for items
const Comment = mongoose.model('Comment',commentSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
router.post('/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new animal in the sanctuary: takes a title and a path to an image.
router.post('/', async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    sci_name: req.body.sci_name,
    habitat: req.body.habitat,
    path: req.body.path,
    description: req.body.description,
    status: req.body.status,
    fav: req.body.fav,
  });
  try {
    await animal.save();
    res.send(animal);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the animals in sanctuary.
router.get('/', async (req, res) => {
  try {
    let animals = await Animal.find();
    res.send(animals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Animal.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let animal = await Animal.findOne({
      _id: req.params.id
    });
    animal.name = req.body.name;
    animal.description = req.body.description;
    animal.status = req.body.status;
    animal.fav = req.body.fav;
    animal.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/:animalID/comments', validUser, async (req, res) => {
  try {
      let animal = await Animal.findOne({_id: req.params.animalID});
      if (!animal) {
        res.sendStatus(404)
        return;
      }
      let comment = new Comment({
        animal: animal,
        user: req.user,
        comment: req.body.comment,
      });
      await comment.save();
      return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:animalID/comments', async (req, res) => {
  try {
      let animal = await Animal.findOne({_id: req.params.animalID});
      if (!animal) {
          res.sendStatus(404);
          return;
      }
      let comments = await Comment.find({
        animal:animal,
      }).sort({
          created: -1
        }).populate('user');
      return res.send(comments);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

//needs to be fixed if it will be used...
router.put('/:animalID/comments/:commentID', async (req, res) => {
  try {
      let comment = await Comment.findOne({_id:req.params.commentID, animal: req.params.animalID});
      if (!comment) {
          res.send(404);
          return;
      }
      comment.user = req.body.user;
      comment.comment = req.body.comment;
      await comment.save();
      res.send(comment);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

router.delete('/:animalID/comments/:commentID', async (req, res) => {
  try {
      let comment = await Comment.findOne({
        _id:req.params.commentID, 
        animal: req.params.animalID});
      if (!comment) {
          res.send(404);
          return;
      }
      await comment.delete();
      return res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

//get favorite animals from sanctuary
router.get('/:UserID/favorites', async (req, res) => {
  try {
    let favorites = await Animal.find({fav:true,});
    res.send(favorites)
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model_Animal: Animal,
  model_Comment: Comment,
  routes: router,
}
