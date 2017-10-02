const express = require('express');
const Router = express.Router();
const imageController = require('./imageController');

Router.post('/', (req, res) => {
  imageController.createImage(req.body, (err, newImage) => {
    if (err) {
      res.send(err);
    } else {
      res.send(newImage);
    }
  })
})

Router.get('/', (req, res) => {
  //Lay het anh
})

Router.get('/:id', (req, res) => {
  //Lay anh theo id
})

Router.put('/:id ', (req, res) => {
  //Them like
})

module.exports = Router;
