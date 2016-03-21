/**
 *  Vote schema
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/

/**
 *  Define Vote Model
 *  @param {Object} schema
 *  @return {Object}
 **/
module.exports = function (schema) {
  var Vote = schema.define('vote', {
    id: {type: schema.Number, index: true },
    email: {type: schema.String, "null": false},
    for: {type: schema.Text, "null": false},
    activated: {type: schema.Date},
    created: {type: schema.Date, default: Date.now}
  }, {
    indexes: {
      idx_1: {
        columns: 'email, for'
      },
    },
    primaryKeys: ['id']
  });
  return Vote;
};
