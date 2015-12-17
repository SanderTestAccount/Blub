'use strict';

//Nested resource
angular.module('mean.auctions').factory('Offers', ['$resource',
    function($resource) {
        return $resource('api/auctions/:auctionId/offers/:offerId', {
            offerId: '@_id',
            auctionId: '@auctionId'
        });
    }
]);
