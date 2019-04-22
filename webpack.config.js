/*
  1 Dependencies: webpack webpack-dev-server
  
  2 To support code spitting
  - Include 'chunkFilename" to support code splitting (lazy-loading - which means it is extra bundle and 
    not part of main bundle.js which is not downloaded initially.)
  - Dependencies: babel-plugin-syntax-dynamic-import babel-preset-stage-2
  - Configure plugin on .babelrc - "plugins": ["syntax-dynamic-import"]
  - Configure preset on .babelrc - "preset": ["state-2"]
*/

const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[id].js", // To support code splitting (lazy-loading)
    publicPath: ""
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      // Handle JS, JSX (dependencies: bable-loader babel-core babel-preset-react babel-preset-env)
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },

      // Handle CSS (dependencies: style-loader css-loader postcss-loader autoprefixer)
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                autoprefixer({
                  browsers: ["> 1%", "last 2 versions"]
                })
              ]
            }
          }
        ]
      },

      // Handle images (dependencies: url-loader file-loader)
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "url-loader?limit=8000&name=images/[name].[ext]"
      }
    ]
  },

  // Handle connection for our index.html file to output files that are generated.  When using dev server output files are generated but only stored in memory.
  // (dependencies: html-webpack-plugin).
  // Webpack will inject our bundle.js script, etc. into our index.html file.
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
};
