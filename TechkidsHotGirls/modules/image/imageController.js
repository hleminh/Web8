const imageModel = require('./imageModel');

const createImage = (image, callback) => {
  let newImage = {
    imageUrl: image.imageUrl,
    content: image.content,
    posterId: null,
    title: image.title
  }
  imageModel.createImage(newImage, (err, newImage) => {
    if (err) {
      callback(err);
    } else {
      let result = {
        imageUrl: newImage.imageUrl,
        content: newImage.content,
        title: newImage.title,
        likes: newImage.likes.length,
        views: newImage.views
      }
      callback(null, result);
    }
  });
}

module.exports = {
  createImage
}
