const models = require('../models');

const { Account } = models;

// renders login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

// renders account page
const accountPage = (req, res) => {
  res.render('account', { csrfToken: req.csrfToken() });
};

// ends current session and returns to login page
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// handles login
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  // if username or password are empty
  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    // if username or password is incorrect
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    // otherwise, start a session for user
    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/msg' });
  });
};

// handles signup
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // if username or password are empty
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // if passwords do not match
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  // hashes password and attempts to save the account into the database
  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/msg' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(400).json({ error: 'An error occurred!' });
  }
};

// returns CSRF token
const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

module.exports = {
  loginPage,
  accountPage,
  logout,
  login,
  signup,
  getToken,
};
