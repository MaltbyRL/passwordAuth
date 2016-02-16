'use strict';

var bcrypt = require('bcrypt-node');

var password = "password"

bcrypt.genSalt(10, function(err, salt) {

  bcrypt.hash(password, salt, null, function(err, hash){

    console.log('err:', err);
    console.log('salt:', hash);

    bcrypt.compare(password, hash, function(err, result){
      console.log('err:', err)
      console.log("result:", result);
    });

  });
});
