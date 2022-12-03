const models = require('../models');
const MessageModel = require('../models/Message.js');

const { Message } = models;

// renders message page
const messagePage = (req, res) => res.render('app');

// creates a new message
const makeMessage = async (req, res) => {
  // if message is empty
  if (!req.body.msg) {
    return res.status(400).json({ error: 'Message is required!' });
  }

  const msgData = {
    author: req.session.account.username,
    msg: req.body.msg,
    owner: req.session.account._id,
  };

  // attempts to save the message into the database
  try {
    const newMessage = new Message(msgData);
    await newMessage.save();
    return res.status(201).json({ message: newMessage.msg, author: newMessage.author, popup: 'Message posted!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Message already exists!' });
    }
    return res.status(400).json({ error: 'An error occurred.' });
  }
};

// returns all messages in database
const getMessages = (req, res) => MessageModel.getAllMessages((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred.' });
  }
  return res.json({ messages: docs });
});

module.exports = {
  messagePage,
  makeMessage,
  getMessages,
};
