const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  const isDevMode = argv.mode !== 'production'

  return {
    entry: './src/js/app.js',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: false,
      port: 9000
    },
    output: {
      filename: isDevMode ? 'main.js' : 'main.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.scss/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.svg/,
          oneOf: [
            {
              resourceQuery: /inline/,
              loader: 'html-loader',
              options: {
                esModule: false
              }
            },
            {
              loader: 'file-loader',
              options: {
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png)/,
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        minify: false,
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? 'main.css' : 'main.[contenthash].css'
      })
    ]
  }
}
