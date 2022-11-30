require('dotenv').config();

const connections = {
  development: {
    http: {
      port: 3000,
    },
    mongo: 'mongodb://localhost/IGMEProject2',
    redis: process.env.REDISCLOUD_URL,
  },
  production: {
    http: {
      port: process.env.PORT || process.env.NODE_PORT || 3000,
    },
    mongo: process.env.MONGODB_URI || 'mongodb+srv://ask9458Heroku:jLzi2RYJl1f9adxZ@cluster0.piszaai.mongodb.net/?retryWrites=true&w=majority',
    redis: process.env.REDISCLOUD_URL,
  },
};

module.exports = {
  connections: connections[process.env.NODE_ENV],
  secret: process.env.SECRET,
};
