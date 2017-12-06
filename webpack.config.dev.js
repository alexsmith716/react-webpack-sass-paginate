
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
require('dotenv').config();

module.exports = {
  
  devtool: 'source-map',

  entry: {
    app: [
      //'eventsource-polyfill',
      'webpack-hot-middleware/client?reload=true',
      //'webpack/hot/only-dev-server',
      //'react-hot-loader/patch',
      'babel-polyfill',
      path.join(__dirname, './client/assets/scss/global.scss'),
      path.join(__dirname, './client/index.js')
    ],
    //vendor: ['react', 'react-dom']
  },

  output: {
    path: path.join(__dirname, './public/static/dist/client'),
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    filename: '[name].js',
    // the filename template for entry chunks
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // chunkFilename: "[name].js",
    // chunkFilename: "[id].js",
    // chunkFilename: '[name].[chunkhash].js', // for long term caching
    // the filename template for additional chunks
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    publicPath: '/',
    // the url to the output directory resolved relative to the HTML page
  },

   resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [ path.resolve(__dirname, 'client/assets/scss') ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: [ path.resolve(__dirname, 'client/assets/scss') ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                      browsers: ['last 2 versions','IE >= 9','safari >= 8']
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                      browsers: ['last 2 versions','IE >= 9','safari >= 8']
                  }),
                ],
              },
            },
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }]
      },
    ],
  },

  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    //new webpack.IgnorePlugin(/\/iconv-loader$/),
    //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new HtmlWebpackPlugin({
      template: 'client/index.template.html',
      inject: 'body',
      filename: 'index.html'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    /*
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[chunkhash].js',
    }),
    */

    // new ExtractTextPlugin("styles.css"),
    new ExtractTextPlugin({
      filename: 'styles.css',
      //filename: '[name].[chunkhash].css'
    }),

    /*
    new ManifestPlugin({
      basePath: '/',
    }),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    */

    //new webpack.optimize.UglifyJsPlugin({
    //  compressor: {
    //    warnings: false,
    //  },
    //}),

  ]
};



