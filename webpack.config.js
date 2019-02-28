const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        publicPath: '/dist/',
        contentBase: path.resolve(__dirname, ""),
        compress: true,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            WebFont: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
            Phaser: 'phaser'
        })
    ]
};