const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    questboard: './client/questboard.js',
    login: './client/login.js',
    signup: './client/signup.js',
    signupSuccess: './client/signupSuccess.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
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
      template: './client/static/questboard.html',
      chunks: ['questboard']
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'login.html',
      template: './client/static/login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      title: 'Signup',
      filename: 'signup.html',
      template: './client/static/signup.html',
      chunks: ['signup']
    }),
    new HtmlWebpackPlugin({
      title: 'Signup Success',
      filename: 'signupSuccess.html',
      template: './client/static/signupSuccess.html',
      chunks: ['signupSuccess']
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
