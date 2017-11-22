const webpack = require('webpack');
const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = (env) => ({
    entry: './index.ts',
    context: path.join(__dirname, 'src'),
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: [nodeExternals()],
    target: 'node',
    resolve: {
        extensions: ['.ts']
    },
    plugins: [],
    module: {
        loaders: [
            {test: /\.ts(x?)$/, loader: 'ts-loader'}
        ]
    }
});