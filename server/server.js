import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import * as dbMongo from './utilities/utilities';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import favicon from 'serve-favicon';

import dotenv from 'dotenv';
dotenv.config();

dbMongo.setUpConnection();

const app = new express();

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, './public')));
app.use(favicon(path.join(__dirname, '../public/static/favicon', 'favicon.ico')));
app.use(cors());


// all articles
app.get('/articles', (req, res) => {
  dbMongo.listArticles().then(data => res.send(data));
});

// create new
app.post('/articles', (req, res) => {
  dbMongo.createArticle(req.body).then(data => res.send(data));
});

// edit
app.put('/articles/:id', (req, res) => {
  dbMongo.updateArticle(req.params.id, req.body).then(data => res.send(data));
});

// delete
app.delete('/articles/:id', (req, res) => {
  dbMongo.deleteArticle(req.params.id).then(data => res.send(data));
});



app.use((req, res, next) => {
  console.log('>>>>>>>>>>> GOING THROUGH APP NOW <<<<<<<<<<<<<');
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers);
  if(req.user) {
    console.log('REQ.user +++++: ', req.user);
    console.log('REQ.user._id++: ', req.user._id);
  } else {
    console.log('REQ.user +++++: NO USER');
  };
  console.log('<<<<<<<<<<< GOING THROUGH APP NOW >>>>>>>>>>>>>');
  // authorization: 'Bearer eyJhbGciOgiJIU',
  next();
});



if (process.env.NODE_ENV !== 'production') {

  console.log('>>>>>>>>> server > process.env.NODE_ENV 1: ', process.env.NODE_ENV)
  const compiler = webpack(config);

  // emit processed webpack files to express server
  //const middleware = (webpackDevMiddleware(compiler, { noInfo: false, publicPath: config.output.publicPath }));
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'client',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  //console.log('>>>>>>>>> server > middleware: ', middleware)

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));


  app.get('*', function response(req, res) {
    console.log('>>>>>>>>> server > process.env.NODE_ENV 2: ', process.env.NODE_ENV)

    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));

    res.end();

  });


} else {

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

}


app.listen(process.env.PORT, error => {
  if (!error) {
    console.log(`Running on port ${process.env.PORT}`);
  }
});

export default app;



