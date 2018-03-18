const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceController');
const user_controller = require('../controllers/userController');

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = function(app, passport) {
  /// SESSION ROUTES ///

  app.get('/signup', user_controller.user_create_get);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/catalog',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  app.get('/login', user_controller.user_login_get);
  app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/catalog',
    failureRedirect: 'login',
    failureFlash: true,
  }));

  /// CATALOG ROUTES ///

  /// BOOK ROUTES ///
  app.get('/catalog', book_controller.index);
  app.get('/catalog/book/create', book_controller.book_create_get);
  app.post('/catalog/book/create', book_controller.book_create_post);
  app.get('/catalog/book/:id/delete', book_controller.book_delete_get);
  app.post('/catalog/book/:id/delete', book_controller.book_delete_post);
  app.get('/catalog/book/:id/update', book_controller.book_update_get);
  app.post('/catalog/book/:id/update', book_controller.book_update_post);
  app.get('/catalog/book/:id', book_controller.book_detail);
  app.get('/catalog/books', book_controller.book_list);

  /// AUTHOR ROUTES ///
  app.get('/catalog/author/create', author_controller.author_create_get);
  app.post('/catalog/author/create', author_controller.author_create_post);
  app.get('/catalog/author/:id/delete', author_controller.author_delete_get);
  app.post('/catalog/author/:id/delete', author_controller.author_delete_post);
  app.get('/catalog/author/:id/update', author_controller.author_update_get);
  app.post('/catalog/author/:id/update', author_controller.author_update_post);
  app.get('/catalog/author/:id', author_controller.author_detail);
  app.get('/catalog/authors', author_controller.author_list);

  /// GENRE ROUTES ///
  app.get('/catalog/genre/create', genre_controller.genre_create_get);
  app.post('/catalog/genre/create', genre_controller.genre_create_post);
  app.get('/catalog/genre/:id/delete', genre_controller.genre_delete_get);
  app.post('/catalog/genre/:id/delete', genre_controller.genre_delete_post);
  app.get('/catalog/genre/:id/update', genre_controller.genre_update_get);
  app.post('/catalog/genre/:id/update', genre_controller.genre_update_post);
  app.get('/catalog/genre/:id', genre_controller.genre_detail);
  app.get('/catalog/genres', genre_controller.genre_list);

  /// BOOKINSTANCE ROUTES ///
  app.get('/catalog/bookinstance/create', book_instance_controller.bookinstance_create_get);
  app.post('/catalog/bookinstance/create', book_instance_controller.bookinstance_create_post);
  app.get('/catalog/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);
  app.post('/catalog/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);
  app.get('/catalog/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);
  app.post('/catalog/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);
  app.get('/catalog/bookinstance/:id', book_instance_controller.bookinstance_detail);
  app.get('/catalog/bookinstances', book_instance_controller.bookinstance_list);

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  
};