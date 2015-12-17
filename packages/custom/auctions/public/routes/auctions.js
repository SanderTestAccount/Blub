'use strict';

//Setting up route
angular.module('mean.auctions').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all auctions', {
        url: '/auctions',
        templateUrl: '/auctions/views/list.html'
      })
      .state('create auction', {
        url: '/auctions/create',
        templateUrl: '/auctions/views/create.html',
        requiredCircles : {
          circles: ['can create content']
        }
      })
      .state('edit auction', {
        url: '/auctions/:auctionId/edit',
        templateUrl: '/auctions/views/edit.html',
        requiredCircles : {
          circles: ['can edit content']
        }
      })
      .state('auction by id', {
        url: '/auctions/:auctionId',
        templateUrl: '/auctions/views/view.html'
      })
    ;

  }
]);
