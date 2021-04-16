const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const animals = require("./animals.js")
const Animal = animals.model_Animal;

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

//Schema for Favorites
const favoriteSchema = new mongoose.Schema({
    animal: {
        type: mongoose.Schema.ObjectId,
        ref: 'Animal'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
})

// Model for Favorites
const Favorite = mongoose.model('Favorite',favoriteSchema);

//add favorite animal for user
router.post('/:animalID', validUser, async (req, res) => {
    try {
        let animal = await Animal.findOne({_id: req.params.animalID});
        if (!animal) {
            console.log(animals)
          res.sendStatus(404)
          return;
        }
        //checks to see if animal is already a user's favorite
        let otherFavorite = await Favorite.findOne({
            animal: animal,
            user: req.user,
        });
        if (!otherFavorite) {
            let favorite = new Favorite({
            animal: animal,
            user: req.user,
            });
            await favorite.save();
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(403);
        }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  // get all favorite animals of a user
  router.get('/', validUser, async (req, res) => {
    try {
        let favorites = await Favorite.find({
          user: req.user._id,
        }).sort({
            created: -1
          }).populate('animal');
        return res.send(favorites);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
  });

  //remove animal from favorites of a user
  router.delete('/:animalID', validUser, async (req, res) => {
    try {
        let animal = await Animal.findOne({_id: req.params.animalID});
        let favorite = await Favorite.findOne({
          user: req.user, 
          animal: animal});
        if (!favorite) {
            res.send(404);
            return;
        }
        await favorite.delete();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
  });

  module.exports = {
    model: Favorite,
    routes: router,
  }