'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Auction = mongoose.model('Auction'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Auctions) {

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
         * Create an auction
         */
        create: function(req, res) {
            var auction = new Auction(req.body);
            auction.user = req.user;

            auction.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the auction'
                    });
                }

                Auctions.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/auctions/' + auction._id,
                    name: auction.title
                });

                res.json(auction);
            });
        },
        /**
         * Update an auction
         */
        update: function(req, res) {
            var auction = req.auction;

            auction = _.extend(auction, req.body);

            auction.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the auction'
                    });
                }

                Auctions.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: auction.title,
                    url: config.hostname + '/auctions/' + auction._id
                });

                res.json(auction);
            });
        },
        /**
         * Delete an auction
         */
        destroy: function(req, res) {
            var auction = req.auction;


            auction.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the auction'
                    });
                }

                Auctions.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: auction.title
                });

                res.json(auction);
            });
        },
        /**
         * Show an auction
         */
        show: function(req, res) {

            //Sort
            req.auction.offers = req.auction.offers.sort(function(a, b) {
                return new Date(b.created) - new Date(a.created);
            });

            //Create evet
            var event = {
                action: 'viewed',
                name: req.auction.title,
                url: config.hostname + '/auctions/' + req.auction._id
            };

            //Add user to event
            if(req.user !== undefined) {
                user: {
                    name: req.user.name
                }
            }

            //Dispatch event
            Auctions.events.publish(event);

            res.json(req.auction);
        },
        /**
         * List of Auctions
         */
        all: function(req, res) {
            Auction.find({}).sort('-created').exec(function(err, auctions) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the auctions'
                    });
                }

                res.json(auctions)
            });

        }
    };
}