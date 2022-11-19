const models = require('../models');
const MessageModel = require('../models/Message');

const { Message } = models;

const makerPage = (req, res) => res.render('app');

const makeMessage = async (req, res) => {
  if (!req.body.msg) {
    return res.status(400).json({ error: 'Message is required!' });
  }

  const msgData = {
    author: req.session.account.username,
    msg: req.body.msg,
    owner: req.session.account._id,
  };

  try {
    const newMessage = new Message(msgData);
    await newMessage.save();
    return res.status(201).json({ message: newMessage.msg, author: newMessage.author });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Message already exists!' });
    }
    return res.status(400).json({ error: 'An error occurred.' });
  }
};

const getMessages = (req, res) => MessageModel.getAllMessages((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred.' });
  }
  return res.json({ messages: docs });
});

module.exports = {
  makerPage,
  makeMessage,
  getMessages,
};
