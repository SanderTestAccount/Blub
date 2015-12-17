'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Auctions = new Module('auctions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Auctions.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Auctions.routes(app, auth, database);

  Auctions.aggregateAsset('css', 'auctions.css');

  
  //We are adding a link to the main menu for all authenticated users
  Auctions.menus.add({
    'title': 'Auctions',
    'link': 'all auctions',
    'roles': ['authenticated', 'anonymous']
  });
  Auctions.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Auction',
    'link': 'create auction'
  });

  Auctions.events.defaultData({
    type: 'post',
    subtype: 'auction'
  });

  Auctions.events.defaultData({
      type: 'post',
      subtype: 'offer'
  });

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);
	
  return Auctions;
});
