const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    questboard: './client/questboard.js',
    index: './client/index.js',
    signup: './client/signup.js',
    signupSuccess: './client/signupSuccess.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'QuestBoard',
      filename: 'questboard.html',
      template: path.resolve(__dirname, './client/static/questboard.html'),
      chunks: ['questboard']
    }),
    new HtmlWebpackPlugin({
      title: 'Index',
      filename: 'index.html',
      template: path.resolve(__dirname, './client/static/index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'Signup',
      filename: 'signup.html',
      template: path.resolve(__dirname, './client/static/signup.html'),
      chunks: ['signup']
    }),
    new HtmlWebpackPlugin({
      title: 'Signup Success',
      filename: 'signupSuccess.html',
      template: path.resolve(__dirname, './client/static/signupSuccess.html'),
      chunks: ['signupSuccess']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
    })
  ],
  devServer: {
    proxy: {
      '/questboard': 'http://localhost:3000'
    },
    static: {
      directory: path.resolve(__dirname, './build')
    },
    compress: true,
    port: 8080
  }
};
