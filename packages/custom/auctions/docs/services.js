'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Auction operations',
      path: '/auctions',
      method: 'GET',
      summary: 'Get all Auctions',
      notes: '',
      type: 'Auction',
      nickname: 'getAuctions',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/auctions',
      method: 'POST',
      summary: 'Create auction',
      notes: '',
      type: 'Auction',
      nickname: 'createAuction',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Auction to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Auction',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
