var User = require('../models/user');

exports.user_create_get = function(req, res, next) {
  res.render('session_form', { title: 'Signup' });
};

exports.user_create_post = function(req, res) {};

exports.user_login_get = function(req, res) {
  res.render('session_form', { title: 'Login' });
};

exports.user_login_post = function(req, res) {};
