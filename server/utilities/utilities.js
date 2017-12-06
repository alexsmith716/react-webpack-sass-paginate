import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import '../models/Article';

const Article = mongoose.model('Article');

const dbURI = process.env.DB_URI;

export function setUpConnection() {
  mongoose.Promise = global.Promise;
  const mongooseOptions = {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000
  };
  mongoose.connect(dbURI, mongooseOptions, error => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!');
      throw error;
    }
  });
}

mongoose.connection.on('connected', function() {
  console.log('####### > MONGOOSE CONNECTED: ' + dbURI)
})
mongoose.connection.on('error', function(err) {
  console.log('####### > Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
  console.log('####### > Mongoose disconnected')
})

// create date
function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = date.getFullYear();
  return dd + '.' + mm + '.' + yy;
}

// all articles
export function listArticles() {
  return Article.find();
}

// create new
export function createArticle(data) {
  const article = new Article({
    id: Math.random(),
    header: data.header,
    author: data.author,
    date: formatDate(new Date()),
    text: data.text
  });
  return article.save();
}

// edit
export function updateArticle(queryId, data) {
  const article = {
    id: data.id,
    header: data.header,
    author: data.author,
    date: data.date,
    text: data.text
  };
  return Article.findOneAndUpdate(
    {
      _id: queryId
    },
    article
  );
}

// delete
export function deleteArticle(id) {
  return Article.findById(id).remove();
}
