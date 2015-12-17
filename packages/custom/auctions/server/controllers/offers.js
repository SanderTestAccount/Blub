'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Auction = mongoose.model('Auction'),
    Offer = mongoose.model('Offer'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Offers) {

    return {
        /**
         * Find auction by id
         */
        auction: function(req, res, next, id) {
            Auction.load(id, function(err, auction) {
                if (err) return next(err);
                if (!auction) return next(new Error('Failed to load auction ' + id));
                req.auction = auction;
                next();
            });
        },

        /**
         * Create an offer
         *
         * TODO To much code in controller
         */
        create: function(req, res) {

            var auction = req.auction;
            var offer = new Offer(req.body);
            offer.user = req.user;
            offer.auction = auction;

            if(auction.latest_offer && auction.latest_offer.price >= parseInt(offer.price)) {
                return res.status(409).json({
                    error: "Offer is to low"
                })
            }

            offer.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the offer'
                    });
                }

                //TODO: This should be done on model level
                //We are storing the auction relation here.
                //We used a one-to-many 2-way relation in the database
                auction.offers.push(offer._id);
                auction.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the offer #2'
                        });
                    }

                    res.json(offer);
                })

            });

        }
    };
}