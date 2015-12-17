'use strict';

angular.module('mean.auctions').controller('OffersController', ['$scope', '$stateParams', '$location', 'Global', 'Auctions', 'MeanUser', 'Circles', 'Offers',
  function($scope, $stateParams, $location, Global, Auctions, MeanUser, Circles, Offers) {
    $scope.global = Global;

    $scope.create = function(isValid) {

      if (isValid) {
        // $scope.auction.permissions.push('test test');

        var auction = $scope.auction;
        var offer = new Offers($scope.offer);

        // Set auctionId we need this for our nested resource
        offer.auctionId = auction._id;

        offer.$save(function(response) {

          //Update model on client side and resort
          $scope.auction.offers.push(response);
          $scope.auction.offers = $scope.auction.offers.sort(function(a, b) {
              return new Date(b.created) - new Date(a.created);
          });

          $location.path('auctions/' + auction._id);
        });

        $scope.offer = {};

      } else {
        $scope.submitted = true;
      }
    };

      /**
       * Initialize form
       */
    $scope.initForm = function() {
        $scope.offer = {}
        //Set auctionId we need this for our nested resource
        $scope.offer.auctionId = $stateParams.auctionId;
    };

  }
]);