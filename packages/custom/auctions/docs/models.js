exports.models = {

  Auction: {
    id: 'Auction',
    required: ['content', 'title'],
    properties: {
   
      title: {
        type: 'string',
        description: 'Title of the auction'
      },
      content: {
        type: 'string',
        description: 'content of the auction'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the auction'
      }
    }
  }
};
