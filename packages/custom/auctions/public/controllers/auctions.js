'use strict';

angular.module('mean.auctions').controller('AuctionsController', ['$scope', '$stateParams', '$location', 'Global', 'Auctions', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Auctions, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(auction) {
      return MeanUser.isAdmin;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.initForm = function() {
        //Laat maar eventjes achterwegen
        //$('#endDatePicker').datepicker();
    }

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.auction.permissions.push('test test');
        var auction = new Auctions($scope.auction);

        auction.$save(function(response) {
          $location.path('auctions/' + response._id);
        });

        $scope.auction = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(auction) {
      if (auction) {
        auction.$remove(function(response) {
          for (var i in $scope.auctions) {
            if ($scope.auctions[i] === auction) {
              $scope.auctions.splice(i, 1);
            }
          }
          $location.path('auctions');
        });
      } else {
        $scope.auction.$remove(function(response) {
          $location.path('auctions');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var auction = $scope.auction;
        if (!auction.updated) {
          auction.updated = [];
        }
        auction.updated.push(new Date().getTime());

        auction.$update(function() {
          $location.path('auctions/' + auction._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Auctions.query(function(auctions) {
        $scope.auctions = auctions;
      });
    };

    $scope.findOne = function() {
      Auctions.get({
        auctionId: $stateParams.auctionId
      }, function(auction) {
        $scope.auction = auction;
      });
    };
  }
]);