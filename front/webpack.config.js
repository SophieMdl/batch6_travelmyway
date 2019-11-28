const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = () => {
  return {
    devServer: {
      contentBase: './dist'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/'
    },
    watch: true,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.svg$/,
          loader: 'url-loader'
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.jpg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
                publicPath: 'assets'
              }
            }
          ]
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebPackPlugin({
        inject: false,
        template: './src/index.ejs',
        googleApiUrl: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`
      })
    ]
  }
}
