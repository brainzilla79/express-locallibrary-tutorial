const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceController');
const user_controller = require('../controllers/userController');

function protectedRoute(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function authRoute(req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    if (req.user) {
      res.redirect('/catalog');
    } else {
      res.redirect('/login');
    }
  });

  /// SESSION ROUTES ///

  app.get('/signup', authRoute, user_controller.user_create_get);
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/catalog',
      failureRedirect: '/signup',
      failureFlash: true
    })
  );
  app.get('/login', authRoute, user_controller.user_login_get);
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/catalog',
      failureRedirect: 'login',
      failureFlash: true
    })
  );
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  /// CATALOG ROUTES ///

  /// BOOK ROUTES ///
  app.get('/catalog', protectedRoute, book_controller.index);
  app.get(
    '/catalog/book/create',
    protectedRoute,
    book_controller.book_create_get
  );
  app.post(
    '/catalog/book/create',
    protectedRoute,
    book_controller.book_create_post
  );
  app.get(
    '/catalog/book/:id/delete',
    protectedRoute,
    book_controller.book_delete_get
  );
  app.post(
    '/catalog/book/:id/delete',
    protectedRoute,
    book_controller.book_delete_post
  );
  app.get(
    '/catalog/book/:id/update',
    protectedRoute,
    book_controller.book_update_get
  );
  app.post(
    '/catalog/book/:id/update',
    protectedRoute,
    book_controller.book_update_post
  );
  app.get('/catalog/book/:id', protectedRoute, book_controller.book_detail);
  app.get('/catalog/books', protectedRoute, book_controller.book_list);

  /// AUTHOR ROUTES ///
  app.get(
    '/catalog/author/create',
    protectedRoute,
    author_controller.author_create_get
  );
  app.post(
    '/catalog/author/create',
    protectedRoute,
    author_controller.author_create_post
  );
  app.get(
    '/catalog/author/:id/delete',
    protectedRoute,
    author_controller.author_delete_get
  );
  app.post(
    '/catalog/author/:id/delete',
    protectedRoute,
    author_controller.author_delete_post
  );
  app.get(
    '/catalog/author/:id/update',
    protectedRoute,
    author_controller.author_update_get
  );
  app.post(
    '/catalog/author/:id/update',
    protectedRoute,
    author_controller.author_update_post
  );
  app.get(
    '/catalog/author/:id',
    protectedRoute,
    author_controller.author_detail
  );
  app.get('/catalog/authors', protectedRoute, author_controller.author_list);

  /// GENRE ROUTES ///
  app.get(
    '/catalog/genre/create',
    protectedRoute,
    genre_controller.genre_create_get
  );
  app.post(
    '/catalog/genre/create',
    protectedRoute,
    genre_controller.genre_create_post
  );
  app.get(
    '/catalog/genre/:id/delete',
    protectedRoute,
    genre_controller.genre_delete_get
  );
  app.post(
    '/catalog/genre/:id/delete',
    protectedRoute,
    genre_controller.genre_delete_post
  );
  app.get(
    '/catalog/genre/:id/update',
    protectedRoute,
    genre_controller.genre_update_get
  );
  app.post(
    '/catalog/genre/:id/update',
    protectedRoute,
    genre_controller.genre_update_post
  );
  app.get('/catalog/genre/:id', protectedRoute, genre_controller.genre_detail);
  app.get('/catalog/genres', protectedRoute, genre_controller.genre_list);

  /// BOOKINSTANCE ROUTES ///
  app.get(
    '/catalog/bookinstance/create',
    protectedRoute,
    book_instance_controller.bookinstance_create_get
  );
  app.post(
    '/catalog/bookinstance/create',
    protectedRoute,
    book_instance_controller.bookinstance_create_post
  );
  app.get(
    '/catalog/bookinstance/:id/delete',
    protectedRoute,
    book_instance_controller.bookinstance_delete_get
  );
  app.post(
    '/catalog/bookinstance/:id/delete',
    protectedRoute,
    book_instance_controller.bookinstance_delete_post
  );
  app.get(
    '/catalog/bookinstance/:id/update',
    protectedRoute,
    book_instance_controller.bookinstance_update_get
  );
  app.post(
    '/catalog/bookinstance/:id/update',
    protectedRoute,
    book_instance_controller.bookinstance_update_post
  );
  app.get(
    '/catalog/bookinstance/:id',
    protectedRoute,
    book_instance_controller.bookinstance_detail
  );
  app.get(
    '/catalog/bookinstances',
    protectedRoute,
    book_instance_controller.bookinstance_list
  );

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
