const mongoose = require('mongoose');
const _ = require('underscore');

let MessageModel = {};

const setName = (name) => _.escape(name).trim();

const MessageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

MessageSchema.statics.toAPI = (doc) => ({
    author: doc.author,
    msg: doc.msg,
});

MessageSchema.statics.getAllMessages = (callback) => MessageModel.find().select('author msg').lean().exec(callback);

MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;