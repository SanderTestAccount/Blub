'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Auction Schema
 */
var AuctionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  endDate: {
      type: Date,
      required: true
  },
  updated: {
    type: Array
  },
  offers: [{
      type: Schema.ObjectId,
      ref: 'Offer'
  }]
},
    {
        toJSON: {
            virtuals: true
        }
    }
);

/**
 * Virtual Fields
 */
AuctionSchema.virtual('latest_offer').get(function() {
    return this.offers.sort(function(a, b) {
        return new Date(b.created) - new Date(a.created);
    })[0];
});
AuctionSchema.virtual('isActive').get(function() {;
    return (new Date(this.endDate) - Date.now()) > 0;
});

/**
 * Validations
 */
AuctionSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

AuctionSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
AuctionSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate({path: 'offers'}).exec(cb);
};

mongoose.model('Auction', AuctionSchema);
