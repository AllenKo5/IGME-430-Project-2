const models = require('../models');
const AccountModel = require('../models/Account.js');

const { Account } = models;

// renders login page
const loginPage = (req, res) => {
  res.render('login');
};

// renders account page
const accountPage = (req, res) => {
  res.render('account');
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
    return res.status(400).json({ popup: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    // if username or password is incorrect
    if (err || !account) {
      return res.status(401).json({ popup: 'Wrong username or password!' });
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
    return res.status(400).json({ popup: 'All fields are required!' });
  }

  // if passwords do not match
  if (pass !== pass2) {
    return res.status(400).json({ popup: 'Passwords do not match!' });
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
      return res.status(400).json({ popup: 'Username already in use!' });
    }
    return res.status(400).json({ popup: 'An error occurred!' });
  }
};

// gets data from currently logged in account
const getAccountData = (req, res) => AccountModel.getAccountData(
  req.session.account._id,
  (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ popup: 'An error occurred.' });
    }
    return res.json({ account: docs });
  },
);

// changes account password
const changePassword = (req, res) => {
  const currentPass = `${req.body.currentPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  // if password fields are empty
  if (!currentPass || !newPass || !newPass2) {
    return res.status(400).json({ popup: 'All fields are required!' });
  }

  // if new password is identical
  if (currentPass === newPass || currentPass === newPass2) {
    return res.status(400).json({ popup: 'New password cannot be same as current one!' });
  }

  // if new passwords do not match
  if (newPass !== newPass2) {
    return res.status(400).json({ popup: 'New passwords do not match!' });
  }

  try {
    AccountModel.changePassword(
      req.session.account._id,
      currentPass,
      newPass,
      (err, pass) => {
        if (err || !pass) {
          console.log(err);
          return res.status(400).json({ popup: 'Current password does not match!' });
        }
        return res.json({ popup: 'Password changed!' });
      },
    );
    return null;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ popup: 'An error occurred!' });
  }
};

// changes current premium status
const changePremium = (req, res) => {
  try {
    AccountModel.changePremium(req.session.account._id, (err, premium) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ popup: 'An error occurred.' });
      }
      if (premium) {
        return res.json({ popup: 'Premium activated!' });
      }
      return res.json({ popup: 'Premium deactivated!' });
    });
    return null;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ popup: 'An error occurred!' });
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
  getAccountData,
  changePassword,
  changePremium,
};
