const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const likesSchema = new Schema({
  userId: {
    type: ObjectId
  },
  likeDate: {
    type: Date,
    default: Date.now()
  }
});

const imageSchema = new Schema({
  imageUrl: {
    type: String,
    require: true
  },
  content: {
    type: String
  },
  likes: {
    type: [{
      type: likesSchema
    }]
  },
  posterId: {
    type: ObjectId
  },
  views: {
    type: Number,
    default: 0
  },
  title: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updateAt: 'update_at'
  }
});

const imageModel = mongoose.model('images', imageSchema);

//Create image
const createImage = (image, callback) => {
  imageModel.create(image, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

module.exports = {
  createImage
}
