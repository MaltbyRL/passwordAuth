'user strict';
var express = require('express')
var router = express.Router()
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node')

var User;

var secret = "this a secret"


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});
// router.get('/profile')


userSchema.pre('save', function(next) {
  var user = this;
  // hash the password
  // this === object we're saving
  if (!this.isNew) return next(); // ensureds we only salt the hash for new users
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});




userSchema.statics.register = function(user, cb) {
  // user === {username: ___ , password: ____ }
  console.log("user:", user);
  User.findOne({
    username: user.username
  }, function(err, dbUser) {
    if (err || dbUser) return cb(err || "Username already taken");
    User.create(user, function(err, savedUser) {
      console.log("savedUser:", savedUser)
      if (err || !savedUser) {
        console.log("error:", err)
        return cb(err || "no savedUser");
      }
      savedUser.password = '';
      cb(err, savedUser)
    });
  });
};

userSchema.statics.isAuthenticated = function(newPassword, res) {
  bcrypt.compare(newPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    (null, isMatch);
  })
};


userSchema.statics.login = function(req, cb) {
  User.findOne(User.username === req.body.username, function(err, founduser) {
    if (err || !founduser) return cb(err || "wrong info")
    console.log("password", User.password)
    var payload = {
      name: founduser.username
    }
    founduser.password = "";
    var token = jwt.encode(payload, secret)
    console.log('token:', token)
    console.log("callback", User)
    cb(err, founduser)

  })
}




User = mongoose.model('User', userSchema);

module.exports = User;
