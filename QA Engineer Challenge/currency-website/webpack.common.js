const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [{
            oneOf: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html')
        })
    ]
};
