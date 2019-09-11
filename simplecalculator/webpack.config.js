//FOR ES6 ONLY
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        './build/js/calculator.js': './src/js/calculator.js',
        './build/css/style.css': './src/scss/main.scss'
    },
    output: {
        path: __dirname + '/',
        filename: '[name]'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [new ExtractTextPlugin('./build/css/style.css')]
};
