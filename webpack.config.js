const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
    entry: [APP_DIR + '/index.js', APP_DIR + '/styles.less'],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                include: APP_DIR,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        port: process.env.PORT || 8080
    }
};

module.exports = config;