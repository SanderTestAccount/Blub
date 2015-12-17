'use strict';

// Auction authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.auction.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        };
    };

    next();
};

module.exports = function(Auctions, app, auth) {
  
  var auctions = require('../controllers/auctions')(Auctions);
  var offers = require('../controllers/offers')(Auctions)

    //Api actions and offers
  app.route('/api/auctions')
    .get(auctions.all)
    .post(auth.requiresLogin, hasPermissions, auctions.create);
  app.route('/api/auctions/:auctionId')
    .get(auth.isMongoId, auctions.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, auctions.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, auctions.destroy);

  app.route('/api/auctions/:auctionId/offers')
      .post(auth.requiresLogin, offers.create)

  // Finish with setting up the auctionId param
  app.param('auctionId', auctions.auction);
};
