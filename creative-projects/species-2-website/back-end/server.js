const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/animals', {
  useNewUrlParser: true
});

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
  user: String,
  comment: String,
})

// Model for items
const Comment = mongoose.model('Comment',commentSchema);

app.listen(3000, () => console.log('Server listening on port 3000!'));

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new animal in the sanctuary: takes a title and a path to an image.
app.post('/api/animals', async (req, res) => {
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
app.get('/api/animals', async (req, res) => {
  try {
    let animals = await Animal.find();
    res.send(animals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/animals/:id', async (req, res) => {
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

app.put('/api/animals/:id', async (req, res) => {
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

app.post('/api/animals/:animalID/comments', async (req, res) => {
  try {
      let animal = await Animal.findOne({_id: req.params.animalID});
      if (!animal) {
        res.sendStatus(404)
        return;
      }
      let comment = new Comment({
        animal: animal,
        user: req.body.user,
        comment: req.body.comment,
      });
      await comment.save();
      res.send(comment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/animals/:animalID/comments', async (req, res) => {
  try {
      let animal = await Animal.findOne({_id: req.params.animalID});
      if (!animal) {
          res.sendStatus(404);
          return;
      }
      let comments = await Comment.find({animal:animal});
      res.send(comments);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.put('/api/animals/:animalID/comments/:commentID', async (req, res) => {
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

app.delete('/api/animals/:animalID/comments/:commentID', async (req, res) => {
  try {
      let comment = await Comment.findOne({_id:req.params.commentID, animal: req.params.animalID});
      if (!comment) {
          res.send(404);
          return;
      }
      await comment.delete();
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

//get favorite animals from sanctuary
app.get('/api/animals/favorites', async (req, res) => {
  try {
    let favorites = await Animal.find({fav:true});
    res.send(favorites)
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
})
