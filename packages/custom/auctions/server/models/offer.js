'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Auction Schema
 */
var OfferSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  auction: {
    type: Schema.ObjectId,
    ref: 'Auction'
  }
});

/**
 * Validations
 */
OfferSchema.path('price').validate(function(title) {
  return !!title;
}, 'Price cannot be blank');

/**
 * Statics
 */
OfferSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Offer', OfferSchema);
