const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getMessages', mid.requiresLogin, controllers.Message.getMessages);
  app.get('/getAccountData', mid.requiresLogin, controllers.Account.getAccountData);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/msg', mid.requiresLogin, controllers.Message.messagePage);
  app.post('/msg', mid.requiresLogin, controllers.Message.makeMessage);

  app.post('/pass', mid.requiresLogin, controllers.Account.changePassword);

  app.post('/premium', mid.requiresLogin, controllers.Account.changePremium);

  app.get('/account', mid.requiresLogin, controllers.Account.accountPage);

  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
