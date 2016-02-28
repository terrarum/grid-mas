var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var htmlMinifiedOptions = {
    collapseWhitespace: true,
    removeRedundantAttributes: true
};

var htmlWebpackOptions = {
    title: 'Grid M.A.S.',
    minify: htmlMinifiedOptions,
    hash: true,
    template: 'src/index.html',
    inject: 'body'
};

module.exports = {
    entry: './src/main.js',
    output: {
        path: 'dist',
        filename: 'grid-mas.js'
    },
    plugins: [
        new HtmlWebpackPlugin(htmlWebpackOptions)
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, cssnano];
    }
};
