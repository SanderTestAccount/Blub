'use strict';

//Auctions service used for auctions REST endpoint
angular.module('mean.auctions').factory('Auctions', ['$resource',
  function($resource) {
    return $resource('api/auctions/:auctionId', {
      auctionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


