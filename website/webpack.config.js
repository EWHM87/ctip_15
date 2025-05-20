// webpack.config.js
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  // Your application entry point
  entry: './src/index.js',

  // Where to output the bundle
  output: {
    filename:   'bundle.js',
    path:       path.resolve(__dirname, 'dist'),
    publicPath: '/',   // supports client-side routing
    clean:      true,  // clears dist/ on rebuild
  },

  // Loaders for JS/JSX and CSS
  module: {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
      // add other loaders (images/fonts/etc.) here
    ]
  },

  // Resolve imports without extensions
  resolve: {
    extensions: ['.js', '.jsx']
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
      // favicon: './public/favicon.ico'  ← removed, since it wasn’t present
    })
  ],

  // Dev server + proxy to your Express backend
  devServer: {
    historyApiFallback: true, // serve index.html for all 404s
    open: true,               // launch browser on start
    hot: true,                // enable hot module replacement

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
};
